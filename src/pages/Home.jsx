import React, { useState, useEffect } from "react";
import Moviecard from "../components/Moviecard";

const API_KEY = "9eaca748007e1684565c605a5582c903";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Debounce (prevents too many API calls)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        let url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${API_KEY}`;

        if (debouncedSearch) {
          url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            debouncedSearch
          )}&page=${page}&api_key=${API_KEY}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, debouncedSearch]);

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search Movies..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900 bg-opacity-60 backdrop-blur-md text-white fixed top-16 left-1/2 transform -translate-x-1/2 z-10"
      />

      {/* Loading */}
      {loading && (
        <p className="text-white text-center mt-32">Loading movies...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center mt-32">{error}</p>
      )}

      {/* Movies */}
      {!loading && !error && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-32 mx-10">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Moviecard movie={movie} key={movie.id} />
            ))
          ) : (
            <p className="text-white col-span-full text-center mt-10">
              No movies found.
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-5 mx-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="p-2 bg-gray-700 text-white rounded disabled:opacity-50 px-6 font-semibold"
        >
          PREV
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="p-2 bg-gray-700 text-white rounded px-6 font-semibold"
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Home;
