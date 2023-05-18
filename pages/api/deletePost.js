import prismaClient from "../../services/prisma.mjs";

export default async function handler(req, res) {
  const prisma = prismaClient()

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


  if (user == null) {
    return res.status(403).send({ message: "Forbidden" });
  }

  const postId = parseInt(req.query.id);

  const deleteContent = prisma.BlogPostContent.delete({
    where: {
      blogPostId: postId,
    },
  })

  const deleteBlog = prisma.BlogPost.delete({
    where: {
      id: postId,
    },
  })


  try {
    await prisma.$transaction([deleteContent, deleteBlog])
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
}