import BlogPostGrid from "../components/BlogPostGrid"
import prismaClient from "../services/prisma.mjs";
import { useState, useEffect } from "react";


export default function Home({ initialPosts, initialCursor, pages }) {

  return <BlogPostGrid initialPosts={initialPosts} initialCursor={initialCursor} />
}

export async function getServerSideProps() {
  const prisma = prismaClient();
  const take = 10;

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
    },
  };
}