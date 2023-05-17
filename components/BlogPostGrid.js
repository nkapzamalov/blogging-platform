import { useState, useRef } from "react";
import BlogPostCard from "./BlogPostCard";
import Pagination from "./Pagination";
import Header from "./Header";
import Footer from "./Footer";
import SearcBar from "./SearcBar";

export default function BlogPostGrid({ initialPosts, initialCursor, isLoggedIn, handleLogout, pages }) {
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(initialCursor);

  const handleNextPage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/blogPosts?cursor=${cursor}&take=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

      });
      const data = await response.json();
      setPosts(data.blogPosts);
      setCursor(data.myCursor);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousPage = async (e) => {

    e.preventDefault();
    try {
      const response = await fetch(`/api/blogPosts?cursor=${cursor}&take=-10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPosts(data.blogPosts);
      setCursor(data.myCursor);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <SearcBar />
      <div className="flex flex-col items-center gap-20">
        <div className="grid gap-6 mt-20">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        <Pagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          hasPreviousPage={cursor === initialCursor}
          hasNextPage={posts.length > 0}
        />
      </div>
      <Footer />
    </>
  );
}