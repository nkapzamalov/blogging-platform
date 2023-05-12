import { PrismaClient } from "@prisma/client";

export default function prisma() {
  const prisma =
    global.prisma ||
    new PrismaClient({
      log: ["query"],
    });

  if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
  }

  return prisma
}




