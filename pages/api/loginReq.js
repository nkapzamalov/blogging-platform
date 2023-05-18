import bcrypt from "bcrypt";
import prismaClient from "../../services/prisma.mjs";

export default async function handler(req, res) {

  const prisma = prismaClient()

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: req.body.email,
      },
    },
  });
  if (user == null) {
    return res.status(422).send({
      message: "We couldn't find a user with that email and password",
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(422).send({
      message: "We couldn't find a user with that email and password",
    });
  }

  const accessToken = generateToken();

  await prisma.authToken.create({
    data: {
      token: accessToken,
      userId: user.id,
    },
  });

  return res.status(200).send({ user, accessToken });
}

function generateToken(len = 64) {
  const alphameric =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let token = [];

  for (let i = 0; i < len; i++) {
    let index = Math.floor(Math.random() * alphameric.length);
    token.push(alphameric.charAt(index));
  }

  return token.join("");
}