import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function Pagination({ totalPages, currentPage }) {

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    const isCurrent = i === currentPage;
    pageLinks.push(
      <Link key={i} href={`/?page=${i}`} className={`inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium ${isCurrent ? 'text-indigo-600 border-indigo-500' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
        {i}
      </Link>

    );
  }

  return (
    <nav className="flex items-center justify-between w-3/4 border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <Link
          href={`/?page=${prevPage}`}
          className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pageLinks}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <Link
          href={`/?page=${nextPage}`}
          className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  )
}
