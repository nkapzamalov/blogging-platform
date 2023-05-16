import prismaClient from "../../services/prisma.mjs";

export default async function handler(req, res) {
  const prisma = prismaClient()

  const query = req.query;
  if (!query) {
    return res.status(400).json({ message: "No search query provided" });
  }

  const results = await prisma.blogPost.findMany({
    where: {
      title: {
        contains: query.search,
      },
    },
  });

  return res.status(200).json(results);
}