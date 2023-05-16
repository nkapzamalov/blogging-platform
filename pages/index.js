
import BlogPostGrid from "../components/BlogPostGrid"
import prismaClient from "../services/prisma.mjs";
import { meResponse } from "../calls/meEndpoint";
import { useState, useEffect } from "react";


export default function Home({ posts, totalPages, currentPage }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  useEffect(() => {
    async function getResponse() {
      const res = await meResponse();
      if (res.status == 200) {
        setIsLoggedIn(true);
      }

    }
    getResponse();
  }, []);

  return <BlogPostGrid posts={posts} totalPages={totalPages} currentPage={currentPage} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
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