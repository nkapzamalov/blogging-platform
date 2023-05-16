import { useState } from 'react';
import Router from 'next/router.js';
import prismaClient from '../../services/prisma.mjs';

export default function EditPostPage({ post }) {

  const [title, setTitle] = useState(post.title);
  const [author, setAuthor] = useState(post.author);
  const [content, setContent] = useState(post.content.content);
  const [summary, setSummary] = useState(post.summary);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [error, setError] = useState("");


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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block font-medium text-gray-700">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="summary" className="block font-medium text-gray-700">Summary</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full h-40 resize-none"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full h-40 resize-none"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
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