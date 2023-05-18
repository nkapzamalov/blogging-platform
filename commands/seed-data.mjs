import bcrypt from "bcrypt";
import prismaClient from "../services/prisma.mjs";
import { faker } from "@faker-js/faker";

async function createUsersAndBlogPosts() {
  const prisma = prismaClient();

  const createUser = async (email, password, numPosts) => {
    const username = faker.person.firstName();
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_ROUNDS));

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    console.log("User created with email:", email);

    await createBlogPosts(user.id, numPosts);
  };

  const createBlogPosts = async (userId, numPosts) => {
    const blogPosts = [];

    for (let i = 0; i < numPosts; i++) {
      const title = faker.lorem.words(8);
      const imageUrl = "https://placehold.co/150x150";
      const summary = faker.lorem.words(10);
      const content = faker.lorem.paragraphs(20);

      blogPosts.push({
        title,
        imageUrl,
        summary,
        content: {
          create: {
            content,
          },
        },
        userId,
      });
    }

    await prisma.$transaction(
      blogPosts.map((data) => prisma.blogPost.create({ data }))
    );

    console.log(`Created ${numPosts} blog posts for User ID: ${userId}`);
  };

  const user1Email = process.env.USER_EMAIL;
  const user1Password = process.env.USER_PASSWORD;
  const user1NumPosts = 12;
  await createUser(user1Email, user1Password, user1NumPosts);

  const user2Email = process.env.USER2_EMAIL;
  const user2Password = process.env.USER2_PASSWORD;
  const user2NumPosts = 10;
  await createUser(user2Email, user2Password, user2NumPosts);

  await prisma.$disconnect();
}

createUsersAndBlogPosts();