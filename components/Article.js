import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "./SearcBar";
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export default function Article({ article, author, error, handleDelete, handleEdit, deleted }) {
  const publishedAt = format(new Date(article.blogPost.publishedAt), "EEE, MMM d yyyy h:mm a 'EST'", { locale: enUS });
  const updatedAt = format(new Date(article.blogPost.updatedAt), "EEE, MMM d yyyy h:mm a 'EST'", { locale: enUS });

  return (
    <>
      <Header />
      <SearchBar />
      <div className="px-6 py-32 lg:px-8 ">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <div className="flex items-center gap-x-2 md:gap-x-4">
            <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <p className="text-sm font-medium text-gray-800">
              {author.username}
            </p>
          </div>
          <h1 className="mt-9 text-3xl font-bold tracking-tight first-letter:uppercase text-gray-900 sm:text-4xl">
            {article.blogPost.title}
          </h1>
          <div className="mt-10 max-w-2xl">
            <p className="font-medium text-base text-gray-600">
              PUBLISHED {publishedAt} | UPDATED {updatedAt}
            </p>
            <div className="font-light text-lg first-letter:uppercase text-gray-900 mt-10">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="flex gap-5 space-x-4 mt-10">
              <button
                className="bg-mypurple text-white px-4 py-2 rounded focus:outline-none focus:ring-2 "
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
            {deleted && (
              <div className="bg-green-100 border border-green-400 text-green-700 text-center px-4 py-2 rounded mb-4 mt-10">
                Article deleted successfully!
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 text-center px-4 py-2 rounded mb-4 mt-10">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
