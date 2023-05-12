export default function BlogPostCard() {
  const post = {
    title: "ipsam corrupti recusandae provident nobis",
    author: "Anna",
    publishAt: "12h ago",
    imageUrl: "https://placehold.co/500x500",
    summary: "Alias porro beatae at illo. Nihil dolore praesentium. Ad quisquam quae ea."
  }

  return (
    <div className="flex flex-col justify-center h-screen">
      <div
        className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="w-full md:w-1/3 md:ml-2 bg-white grid place-items-center">
          <img src={post.imageUrl} alt="tailwind logo" />
        </div>
        <div class="w-full bg-white flex flex-col space-y-2 p-3 gap-5">
          <div class="flex justify-between item-center">
            <div class="flex items-center">
              <p class="capitalize font-semibold text-sm ml-1">
                The overlooked benefits of real Christmas trees
              </p>
            </div>
            <p class="text-gray-500 font-medium hidden md:block">{post.publishAt}</p>
          </div>
          <p class="md:text-sm text-gray-500 w-60">{post.summary}</p>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2 md:gap-x-4 ">
              <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <p class="text-sm font-medium text-gray-800">
                {post.author}
              </p>
            </div>
            <button
              type="button"
              className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}