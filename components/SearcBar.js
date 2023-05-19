import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import CloseOnEscape from "react-close-on-escape";
import { useRouter } from "next/router";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (debouncedSearchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?search=${debouncedSearchTerm}`
        );
        setSearchResults(await response.json());
      } catch (error) {

      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedSearchTerm]);

  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setShowSearchResults(true);
  };

  const onSearchResultSelection = (id) => {
    setSearchResults([]);
    setSearchTerm("");
    setShowSearchResults(false);
    router.push(`/article/${id}`);
  };

  const onSearchResultsClose = () => {
    setSearchTerm("");
    setShowSearchResults(false);
  };

  return (
    <div className="relative">
      <SearchInput
        searchTerm={searchTerm}
        onSearchTermChange={onSearchTermChange}
      />
      <OutsideClickHandler onOutsideClick={onSearchResultsClose}>
        <CloseOnEscape onEscape={onSearchResultsClose}>
          {showSearchResults && (
            <div className="flex justify-center items-center">
              <div
                id="search-results"
                className="absolute top-10 mt-10 w-1/2 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-7 text-gray-900 shadow-lg ring-1 ring-gray-900/5"
              >
                {loading ? (
                  <span>Loading...</span>
                ) : searchResults.length > 0 ? (
                  <SearchResultList
                    searchResults={searchResults}
                    onSearchResultSelection={onSearchResultSelection}
                  />
                ) : (
                  <NoResultsFound />
                )}
              </div>
            </div>
          )}
        </CloseOnEscape>
      </OutsideClickHandler>
    </div>
  );
}

function SearchInput({ searchTerm, onSearchTermChange }) {
  return (
    <div className="flex justify-center items-center mt-10">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchTermChange}
        className=" text-black px-4 py-2 rounded-full w-1/2"
        placeholder="Search for products..."
      />
    </div>
  );
}

function SearchResultList({ searchResults, onSearchResultSelection }) {

  return (
    <div className="flex justify-center items-center">
      <ul className="w-full">
        {searchResults.map((post) => (
          <li
            key={post.id}
            className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
            onClick={() => onSearchResultSelection(post.id)}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NoResultsFound() {
  return (
    <>
      <span className="block w-full rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
        No article found
      </span>
    </>
  );
}
