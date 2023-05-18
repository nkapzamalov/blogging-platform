import React from "react";

export default function NewPostForm({
  title, content, summary, imageUrl, error,
  handleSubmit, handleTitleChange, handleContentChange, handleSummaryChange, handleImageUrlChange }) {

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="title" type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="author">
              Summary
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="author" type="text" placeholder="Enter author name" value={summary} onChange={handleSummaryChange} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="author">
              Image URL
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="author" type="text" placeholder="Enter author name" value={imageUrl} onChange={handleImageUrlChange} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="content" placeholder="Enter content" value={content} onChange={handleContentChange}></textarea>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-mypurple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

