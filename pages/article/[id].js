import Article from "../../components/Article";
import prismaClient from "../../services/prisma.mjs";
import { useContext, useState } from 'react';
import Router from "next/router";
import AuthContext from '../../context/AuthContext';

export default function articlePage({ article, author }) {
  const [error, setError] = useState("");

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

      const data = await response.json()

      if (response.status == 200) {
        return Router.push('/');
      }
      throw new Error(data.message);

    } catch (error) {
      setError(error.message)
    }
  };

  const handleEdit = () => {
    if (auth.isLoggedOut) {
      return Router.push('/login');
    }
    const editPageUrl = `/editPost/${article.blogPostId}`;
    Router.push(editPageUrl);
  };

  return <Article article={article} author={author} error={error} handleDelete={handleDelete} handleEdit={handleEdit} />
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
      blogPost: true
    },
  })

  const author = await prisma.user.findFirst({
    where: {
      id: Number(article.blogPost.userId)
    }
  })

  article = JSON.parse(JSON.stringify(article))

  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      article,
      author
    },
  };
}