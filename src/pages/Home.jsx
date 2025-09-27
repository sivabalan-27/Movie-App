import React, { useEffect, useState } from "react";
import Moviecard from "../components/Moviecard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const API_URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=`;
  const API_URL_SEARCH = `https://api.themoviedb.org/3/search/movie?language=en-US&query=`;

  const BEARER_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzg4ZTEyZWE2NjFiYjk0YjRmYWJhNzRiZDY1ZTY1NSIsIm5iZiI6MTc1ODgyNjUzNS4yNjMsInN1YiI6IjY4ZDU5MDI3OGVhYTBlNWI3YTY4YWJhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-_eyB_9nmDdtY3Dt8TxZMjV--UE2N6yDaaH_zPIvAE";

 
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); 
    }, 500); 
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const currentPage = page || 1;

    const fetchMovies = async () => {
      setLoading(true);
      setNoResults(false);

      try {
        let url = "";
        if (debouncedSearch.trim() === "") {
          setIsSearching(false);
          url = `${API_URL_POPULAR}${currentPage}`;
        } else {
          setIsSearching(true);
          url = `${API_URL_SEARCH}${encodeURIComponent(debouncedSearch)}&page=${currentPage}`;
        }

        const res = await fetch(url, {
          headers: {
            Authorization: BEARER_TOKEN,
            accept: "application/json",
          },
        });
        const data = await res.json();

        let results = data.results || [];

        
        if (debouncedSearch.trim() !== "") {
          results = results.filter(
            (movie) => movie.title.toLowerCase() === debouncedSearch.trim().toLowerCase()
          );
        }

        setMovies(results);
        if (results.length === 0 && debouncedSearch.trim() !== "") setNoResults(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearch, page]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900 bg-opacity-60 text-white fixed top-16 left-1/2 transform -translate-x-1/2 z-10"
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-32 mx-10">
        {loading && <p className="col-span-full text-center">Loading...</p>}
        {!loading && noResults && (
          <p className="col-span-full text-center">No results found.</p>
        )}
        {!loading &&
          movies.map((movie) => <Moviecard movie={movie} key={movie.id} />)}
      </div>

      {/* Pagination */}
      {!isSearching && (
        <div className="flex justify-between mt-5 mx-10">
          <button
            className="p-2 bg-gray-700 text-white rounded disabled:opacity-50 px-7 py-2 font-semibold"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            PREV
          </button>

          <button
            className="p-2 bg-gray-700 text-white rounded px-7 py-2 font-semibold"
            onClick={() => setPage((prev) => prev + 1)}
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
