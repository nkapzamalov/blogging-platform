import Article from "../../components/Article";
import prismaClient from "../../services/prisma.mjs";
import { meResponse } from "../../calls/meEndpoint";
import { useState, useEffect } from "react";
import Router from "next/router";


export default function articlePage({ article }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/deletePost?id=${article.blogPostId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getResponse() {
      const res = await meResponse();
      if (res.status == 200) {
        setIsLoggedIn(true);
      }

    }
    getResponse();
  }, []);

  return <Article article={article} isLoggedIn={isLoggedIn} handleDelete={handleDelete} />
}

export async function getServerSideProps({ query }) {

  const prisma = prismaClient()

  const { id } = query;

  if (isNaN(id)) {
    return { notFound: true };
  }

  let article = await prisma.blogPostContent.findFirst({
    where: {
      blogPostId: Number(id),
    },
    include: {
      blogPost: {
        select: {
          title: true,
          author: true,
          publishedAt: true,
          updatedAt: true,
        }
      }
    },
  });

  article = JSON.parse(JSON.stringify(article))

  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      article,
    },
  };
}