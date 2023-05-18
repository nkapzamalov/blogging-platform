import prismaClient from "../../services/prisma.mjs";

export default async function handler(req, res) {
  const prisma = prismaClient();
  const { cursor, take } = req.query;

  const totalPosts = await prisma.blogPost.count();

  const blogPosts = await prisma.blogPost.findMany({
    take: Number(take),
    skip: Number(take) === 10 ? 1 : 0,
    cursor: {
      id: Number(cursor)
    },
  });

  const totalPages = Math.ceil(totalPosts / Number(take));
  const myCursor = blogPosts[blogPosts.length - 1].id;

  res.status(200).json({ myCursor, blogPosts });
}