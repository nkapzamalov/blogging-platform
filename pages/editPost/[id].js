import { useState, useEffect, useContext } from 'react';
import Router from 'next/router.js';
import prismaClient from '../../services/prisma.mjs';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import EditForm from '../../components/EditForm';
import AuthContext from '../../context/AuthContext.js';

export default function EditPostPage({ post }) {

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content.content);
  const [summary, setSummary] = useState(post.summary);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [error, setError] = useState("");

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.isLoggedOut) {
      Router.push('/login');
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        summary,
        imageUrl,
      }),
    }

    try {

      if (auth.accessToken !== null) {
        options.headers["Authorization"] = auth.accessToken;
      }
      const response = await fetch(`/api/editPost?id=${post.id}`, options);

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message);
      }
      setError("");
      Router.push(`/article/${post.id}`);

    } catch (err) {
      setError(err.message);
    }
  };


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <>
      <Header />
      <EditForm
        title={title}
        content={content}
        summary={summary}
        imageUrl={imageUrl}
        error={error}
        handleFormSubmit={handleFormSubmit}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}
        handleSummaryChange={handleSummaryChange}
        handleImageUrlChange={handleImageUrlChange}
      />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const prisma = prismaClient()
  let post = await prisma.blogPost.findFirst({
    where: {
      id: parseInt(query.id),
    },
    include: {
      content: true
    }
  });

  post = JSON.parse(JSON.stringify(post))

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};