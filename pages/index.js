import Header from "../components/Header"
import Footer from "../components/Footer";
import BlogPostGrid from "../components/BlogPostGrid"
import prismaClient from "../services/prisma.mjs";


export default function Home({ posts, totalPages, currentPage }) {
  return (
    <>
      <Header />
      <BlogPostGrid posts={posts} totalPages={totalPages} currentPage={currentPage} />
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const prisma = prismaClient();

  const page = parseInt(context.query.page) || 1;

  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;

  let posts = await prisma.blogPost.findMany({
    skip: start,
    take: itemsPerPage,
  });
  posts = JSON.parse(JSON.stringify(posts))

  const totalCount = await prisma.blogPost.count();
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return {
    props: {
      posts,
      totalPages,
      currentPage: page,
    },
  };
}