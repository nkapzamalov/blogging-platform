import BlogPostCard from "./BlogPostCard";
import Pagination from "./Pagination";


export default function BlogPostGrid({ posts, totalPages, currentPage }) {
  return (
    <div className="flex flex-col items-center gap-20">
      <div className="grid gap-6 mt-20">
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
