import BlogPostGrid from "../components/BlogPostGrid"
import prismaClient from "../services/prisma.mjs";
import { meResponse } from "../calls/meEndpoint";
import { useState, useEffect } from "react";


export default function Home({ initialPosts, initialCursor, pages }) {
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

  return <BlogPostGrid initialPosts={initialPosts} initialCursor={initialCursor} isLoggedIn={isLoggedIn} handleLogout={handleLogout} pages={pages} />
}

export async function getServerSideProps() {
  const prisma = prismaClient();
  const take = 10;
  const totalPosts = await prisma.blogPost.count();
  const pages = Math.ceil(totalPosts / 10)

  let initialPosts = await prisma.blogPost.findMany({
    take,
    orderBy: {
      id: 'asc',
    },
  });
  initialPosts = JSON.parse(JSON.stringify(initialPosts))

  const lastPostInResults = initialPosts[take - 1]
  const initialCursor = lastPostInResults.id

  return {
    props: {
      initialPosts,
      initialCursor,
      pages
    },
  };
}