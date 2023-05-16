import { useState, useEffect } from 'react';
import { meResponse } from '../../calls/meEndpoint';
import Router from 'next/router.js';
import prismaClient from '../../services/prisma.mjs';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import EditForm from '../../components/EditForm';

export default function EditPostPage({ post }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [author, setAuthor] = useState(post.author);
  const [content, setContent] = useState(post.content.content);
  const [summary, setSummary] = useState(post.summary);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getResponse() {
      const res = await meResponse();
      if (res.status == 200) {
        setIsLoggedIn(true);
      }

    }
    getResponse();
  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/editPost?id=${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          content,
          summary,
          imageUrl,
        }),
      });

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message);
      }
      setError("");
      Router.push(`/article/${post.id}`);

    } catch (err) {
      setError(`${err.message}`);
    }
  };


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
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
      <Header isLoggedIn={isLoggedIn} />
      <EditForm
        title={title}
        author={author}
        content={content}
        summary={summary}
        imageUrl={imageUrl}
        error={error}
        handleFormSubmit={handleFormSubmit}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
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