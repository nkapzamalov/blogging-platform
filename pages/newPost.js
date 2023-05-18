import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewPostForm from "../components/NewPostForm";
import Router from "next/router";
import AuthContext from '../context/AuthContext';


export default function NewPost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.isLoggedOut) {
      Router.push('/login');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
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
    }

    try {
      if (auth.accessToken !== null) {
        options.headers["Authorization"] = auth.accessToken;
      }
      const response = await fetch("/api/createPost", options);

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