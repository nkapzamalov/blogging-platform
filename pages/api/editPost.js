import prismaClient from "../../services/prisma.mjs";

export default async function handler(req, res) {
  const prisma = prismaClient();

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
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

  if (!user) {
    return res.status(403).send({ message: "Forbidden" });
  }

  const postId = parseInt(req.query.id);
  const { title, content, imageUrl, summary } = req.body;

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

  const blogPost = await prisma.blogPost.findFirst({
    where: {
      id: postId,
      userId: user.id,
    },
  });

  if (!blogPost) {
    return res.status(403).send({ message: "You are not the author of this article!" });
  }

  try {
    await prisma.blogPost.update({
      where: {
        id: postId,
      },
      data: {
        title,
        imageUrl,
        summary,
        updatedAt: new Date(),
        content: {
          update: {
            content,
          },
        },
      },
    });
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the post' });
  }
}