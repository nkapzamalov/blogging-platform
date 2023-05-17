import React from "react";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({ handlePreviousPage, handleNextPage, hasPreviousPage, hasNextPage }) {
  return (
    <nav className="flex items-center justify-between w-3/4 border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={handlePreviousPage}
          className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${hasPreviousPage ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          disabled={hasPreviousPage} // Disable the button if there are no previous pages
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </button>
      </div>
      {/* <div className="hidden md:-mt-px md:flex">
        {pageLinks}
      </div> */}
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={handleNextPage}
          className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${!hasNextPage ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          disabled={!hasNextPage} // Disable the button if there are no next pages
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}