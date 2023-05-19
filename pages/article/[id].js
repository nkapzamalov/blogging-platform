import { useState, useEffect, useContext } from 'react';
import Router from "next/router";
import AuthContext from '../../context/AuthContext';
import Article from "../../components/Article";
import prismaClient from "../../services/prisma.mjs";

export default function ArticlePage({ article, author }) {
  const [error, setError] = useState("");
  const [deleted, setDeleted] = useState(false);

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
    };

    try {
      if (auth.accessToken !== null) {
        options.headers["Authorization"] = auth.accessToken;
      }

      const response = await fetch(`/api/deletePost?id=${article.blogPostId}`, options);
      const data = await response.json();

      if (response.status == 200) {
        // Set deleted state to true after successful deletion
        setDeleted(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = () => {
    if (auth.isLoggedOut) {
      return Router.push('/login');
    }

    const editPageUrl = `/editPost/${article.blogPostId}`;
    Router.push(editPageUrl);
  };

  useEffect(() => {
    if (deleted) {
      const timeout = setTimeout(() => {
        Router.push('/');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [deleted]);

  return (
    <div>
      <Article
        article={article}
        author={author}
        error={error}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        deleted={deleted}
      />
    </div>
  );
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