import React, { useState, useEffect } from "react";
import Moviecard from "../components/Moviecard";

const API_KEY = "892a3561";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔥 Fetch movies (OMDb)
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const query = debouncedSearch || "avengers";

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
            query
          )}&page=${page}`
        );

        const data = await res.json();

        if (data.Response === "False") {
          setMovies([]);
          setError(data.Error || "No movies found");
        } else {
          setMovies(data.Search || []);
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, debouncedSearch]);

  // 🔥 SAFE FILTER (no crash)
  const filteredMovies = movies.filter((movie) =>
    (movie?.Title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search Movies..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="p-3 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900/70 backdrop-blur-md text-white fixed top-16 left-1/2 -translate-x-1/2 z-10 outline-none"
      />

      {/* ⏳ Loading */}
      {loading && (
        <p className="text-white text-center mt-32 text-lg">
          Loading movies...
        </p>
      )}

      {/* ❌ Error */}
      {error && !loading && (
        <div className="text-center mt-32">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 rounded text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* 🎬 Movies */}
      {!loading && !error && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-32 px-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Moviecard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <p className="text-white col-span-full text-center mt-10">
              No movies found.
            </p>
          )}
        </div>
      )}

      {/* 🔄 Pagination */}
      <div className="flex justify-between mt-8 px-6 pb-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-6 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          PREV
        </button>

        <span className="text-white self-center">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-6 py-2 bg-gray-700 text-white rounded"
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Home;
