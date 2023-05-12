import prismaClient from "../../services/prisma.mjs";

export default async function handler(req, res) {
  const prisma = prismaClient()

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
  return res.status(200).send({ user: user.id, user: user.email });
}
