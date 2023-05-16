import prismaClient from "../services/prisma.mjs";
import { faker } from "@faker-js/faker"

async function createBlogPosts(numPosts) {

  const prisma = prismaClient()

  await deleteProducts()

  const blogPosts = []

  for (let i = 0; i < numPosts; i++) {
    const title = faker.lorem.words(8)
    const author = faker.person.firstName()
    const imageUrl = "https://placehold.co/150x150"
    const summary = faker.lorem.words(10)
    const content = faker.lorem.paragraphs(20)

    blogPosts.push({
      title,
      author,
      imageUrl,
      summary,
      content: {
        create: {
          content
        }
      }
    })
  }

  await prisma.$transaction(
    blogPosts.map((data) => prisma.blogPost.create({ data }))
  )

  console.log(`Created ${numPosts} blog posts`)

  await prisma.$disconnect()
}

createBlogPosts(10)


async function deleteProducts() {
  await prisma.$transaction([
    prisma.blogPostContent.deleteMany(),
    prisma.blogPost.deleteMany()
  ]);
}