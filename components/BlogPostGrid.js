import BlogPostCard from "./BlogPostCard";
import Pagination from "./Pagination";
import Header from "./Header";
import Footer from "./Footer";
import SearcBar from "./SearcBar";


export default function BlogPostGrid({ posts, totalPages, currentPage, isLoggedIn, handleLogout }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <SearcBar />
      <div className="flex flex-col items-center gap-20">
        <div className="grid gap-6 mt-20">
          {posts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
      <Footer />
    </>
  );
}
