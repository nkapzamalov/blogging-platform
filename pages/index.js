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
  const posts = await prisma.blogPost.findMany({});
  const serializedPosts = posts.map(post => ({
    ...post,
    publishedAt: post.publishedAt.toISOString(),
  }));
  return {
    props: {
      posts: serializedPosts,
    },
  };
}