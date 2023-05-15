import Header from "../components/Header"
import BlogPostGrid from "../components/BlogPostGrid"
import prismaClient from "../services/prisma.mjs";

export default function Home({ posts }) {
  return (
    <>
      <Header />
      <BlogPostGrid posts={posts} />
    </>
  )
}

export async function getServerSideProps() {
  const prisma = prismaClient();

  let posts = await prisma.blogPost.findMany({});
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      posts,
    },
  };
}