import bcrypt from "bcrypt";
import prismaClient from "../services/prisma.mjs";

(async () => {
  const prisma = prismaClient()

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: process.env.USER_EMAIL,
      },
    },
  });

  if (user) {
    console.log("User already exist!");

    return;
  }

  await prisma.user.create({
    data: {
      email: process.env.USER_EMAIL,
      password: bcrypt.hashSync(
        process.env.USER_PASSWORD,
        parseInt(process.env.BCRYPT_ROUNDS)
      ),
    },
  });

  console.log("User created");
})();
