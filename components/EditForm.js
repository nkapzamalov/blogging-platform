export default function EditForm({
  title, content, summary, imageUrl, error,
  handleFormSubmit, handleTitleChange, handleContentChange, handleSummaryChange, handleImageUrlChange }) {

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="summary" className="block font-medium text-gray-700">Summary</label>
          <textarea
            id="summary"
            value={summary}
            onChange={handleSummaryChange}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full h-40 resize-none"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full h-40 resize-none"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-mypurple text-white px-4 py-2 rounded"
          >
            Update Post
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 text-center px-4 py-2 mt-10 rounded mb-4">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
