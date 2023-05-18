import prismaClient from "../../services/prisma.mjs";

export default async function handler(req, res) {
  const prisma = prismaClient();

  if (req.method !== 'DELETE') {
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

  const blogPost = await prisma.blogPost.findFirst({
    where: {
      id: postId,
      userId: user.id,
    },
  });

  if (!blogPost) {
    return res.status(403).send({ message: "You are not the author of this article!" });
  }

  const deleteContent = prisma.blogPostContent.delete({
    where: {
      blogPostId: postId,
    },
  });

  const deleteBlog = prisma.blogPost.delete({
    where: {
      id: postId,
    },
  });

  try {
    await prisma.$transaction([deleteContent, deleteBlog]);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
}