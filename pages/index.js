import BlogPostGrid from "../components/BlogPostGrid"
import prismaClient from "../services/prisma.mjs";


export default function Home({ initialPosts, initialCursor, totalPages }) {

  return <BlogPostGrid initialPosts={initialPosts} initialCursor={initialCursor} totalPages={totalPages} />
}

export async function getServerSideProps() {
  const prisma = prismaClient();
  const take = 10;
  const totalPosts = await prisma.blogPost.count();
  const totalPages = Math.ceil(totalPosts / Number(take));

  let initialPosts = await prisma.blogPost.findMany({
    take,
    orderBy: {
      id: 'asc',
    },
    include: {
      user: true
    }
  });
  initialPosts = JSON.parse(JSON.stringify(initialPosts))

  const lastPostInResults = initialPosts[take - 1]
  const initialCursor = initialPosts.length > 0 ? lastPostInResults.id : null

  return {
    props: {
      initialPosts,
      initialCursor,
      totalPages
    },
  };
}