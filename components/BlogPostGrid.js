import { useState } from "react";
import BlogPostCard from "./BlogPostCard";
import Pagination from "./Pagination";
import Header from "./Header";
import Footer from "./Footer";
import SearcBar from "./SearcBar";

export default function BlogPostGrid({ initialPosts, initialCursor, totalPages }) {
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasNextPage, setHasNextPage] = useState(true);

  const handleNextPage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/pagination?cursor=${cursor}&take=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

      });
      const data = await response.json();
      setHasNextPage(data.hasNextPage)
      setPosts(data.blogPosts);
      setCursor(data.myCursor);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousPage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/pagination?cursor=${cursor - posts.length}&take=-10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setHasNextPage(data.hasNextPage)
      setPosts(data.blogPosts);
      setCursor(data.myCursor);
    } catch (error) {
      console.error(error);
    }
  };

  if (initialCursor === null && posts.length === 0) {
    return (
      <>
        <Header />
        <SearcBar />
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-2xl text-gray-500">No blogs to display.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
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
          hasNextPage={hasNextPage}
          totalPages={totalPages}
        />
      </div>
      <Footer />
    </>
  );
}