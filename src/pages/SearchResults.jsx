import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import searchPosts from "../utils/searchPosts";

function SearchResults() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  console.log("🚀 ~ SearchResults ~ results:", results)

  useEffect(() => {
    if (searchQuery) {
      const fetchData = async () => {
        const data = await searchPosts(searchQuery);
        setResults(data);
      };
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results</h1>
      {results.length === 0 ? (
        <p>No results found for "{searchQuery}".</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <h3>{result.title}</h3>
              <p>{result.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
