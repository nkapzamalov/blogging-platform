import prismaClient from "../../services/prisma.mjs";

export default async function handler(req, res) {
  const prisma = prismaClient();

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      token: {
        some: {
          token: req.headers.authorization,
        },
      },
    },
  });

  if (user == null) {
    return res.status(403).send({ message: "Forbidden" });
  }

  const { title, content, imageUrl, summary } = req.body;

  const existingPost = await prisma.blogPost.findFirst({
    where: {
      title,
    },
  });

  if (existingPost) {
    res.status(400).json({ message: `A post with title ${title} already exists` });
    return;
  }

  if (/^\d+$/.test(title)) {
    res.status(400).json({ message: "Title can't be only numbers" });
    return;
  }

  if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(imageUrl)) {
    res.status(400).json({ message: "Invalid image URL" });
    return;
  }

  if (summary.split(/\s+/).length > 20) {
    res
      .status(400)
      .json({ message: "Summary can't be longer than 20 words" });
    return;
  }

  const MAX_CONTENT_LENGTH = 10000;
  if (content.length > MAX_CONTENT_LENGTH) {
    res
      .status(400)
      .json({ message: `Content can't be longer than ${MAX_CONTENT_LENGTH} characters` });
    return;
  }

  try {
    const post = await prisma.blogPost.create({
      data: {
        title,
        imageUrl,
        summary,
        publishedAt: new Date(),
        updatedAt: new Date(),
        content: {
          create: {
            content,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post" });
  }
}