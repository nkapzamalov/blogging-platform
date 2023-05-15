import BlogPostCard from "./BlogPostCard";

export default function BlogPostGrid({ posts }) {
  return (
    <div className="grid gap-6 mt-20">
      {posts.map(post => (
        <BlogPostCard post={post} />
      ))}
    </div>
  );
}
