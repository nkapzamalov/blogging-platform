import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewPostForm from "../components/NewPostForm";
import Router from "next/router";


export default function NewPost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          content,
          summary,
          imageUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setError("");
      Router.push("/")
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
      <Header />
      <NewPostForm
        title={title}
        author={author}
        content={content}
        summary={summary}
        imageUrl={imageUrl}
        error={error}
        handleSubmit={handleSubmit}
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