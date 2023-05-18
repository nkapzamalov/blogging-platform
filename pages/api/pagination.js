import prismaClient from "../../services/prisma.mjs";

export default async function handler(req, res) {
  const prisma = prismaClient();
  const { cursor, take } = req.query;

  const blogPosts = await prisma.blogPost.findMany({
    take: Number(take),
    skip: Number(take) === 10 ? 1 : 0,
    cursor: {
      id: Number(cursor)
    },
    include: {
      user: true
    },
  });

  const myCursor = blogPosts[blogPosts.length - 1].id;
  const hasNextPage = blogPosts.length === Math.abs(take);

  res.status(200).json({ myCursor, blogPosts, hasNextPage });
}