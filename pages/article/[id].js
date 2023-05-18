import Article from "../../components/Article";
import prismaClient from "../../services/prisma.mjs";
import { useContext } from 'react';
import Router from "next/router";
import AuthContext from '../../context/AuthContext';

export default function articlePage({ article }) {

  const { auth } = useContext(AuthContext);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (auth.isLoggedOut) {
      return Router.push('/login');
    }
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      if (auth.accessToken !== null) {
        options.headers["Authorization"] = auth.accessToken;
      }
      const response = await fetch(`/api/deletePost?id=${article.blogPostId}`, options);

      if (response.status == 200) {
        return Router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    if (auth.isLoggedOut) {
      return Router.push('/login');
    }
    const editPageUrl = `/editPost/${article.blogPostId}`;
    Router.push(editPageUrl);
  };

  return <Article article={article} handleDelete={handleDelete} handleEdit={handleEdit} />
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