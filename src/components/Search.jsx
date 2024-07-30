import { useRef } from "react";
import { useKey } from "../customHooks/useKey";

export const SearchBar = ({ query, setQuery }) => {
  const searchInput = useRef(null);

  useKey("Enter", function (e) {
    if (document.activeElement === searchInput.current) {
      return;
    }
    searchInput.current.focus();
    setQuery("");
  });

  //ref will be used after the dom will be updated and useEffect will be called
  return (
    <input
      ref={searchInput}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
