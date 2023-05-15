import Header from "../components/Header"
import Footer from "../components/Footer";

export default function Article({ article }) {
  return (
    <>
      <Header />
      <div className="px-6 py-32 lg:px-8 mt-20">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <div className="flex items-center gap-x-2 md:gap-x-4">
            <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <p className="text-sm font-medium text-gray-800">
              {article.blogPost.author}
            </p>
          </div>
          <h1 className="mt-9 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{article.title}</h1>
          <div className="mt-10 max-w-2xl">
            <p className="font-medium text-base text-mygray">
              PUBLISHED {article.blogPost.publishedAt} | UPDATED {article.blogPost.updatedAt}
            </p>
            <p className="font-light text-lg text-black mt-10">
              {article.content}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

