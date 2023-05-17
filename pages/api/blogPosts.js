import prismaClient from "../../services/prisma.mjs";

export default async function handler(req, res) {
  const prisma = prismaClient();
  const totalPosts = await prisma.blogPost.count();
  const { cursor, take } = req.query;



  const pages = Math.ceil(totalPosts / 10)

  const blogPosts = await prisma.blogPost.findMany({
    take: Number(take),
    skip: Number(take) === 10 ? 1 : 0,
    cursor: {
      id: Number(cursor)
    },
  });

  console.log(blogPosts.length);

  const lastPostInResults = blogPosts[blogPosts.length - 1];
  const myCursor = lastPostInResults.id;

  console.log(myCursor);

  res.status(200).json({ myCursor, blogPosts });
}