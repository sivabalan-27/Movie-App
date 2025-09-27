import React, { useState, useEffect } from "react";
import Moviecard from "../components/Moviecard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=9eaca748007e1684565c605a5582c903`;

    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&page=${page}&api_key=9eaca748007e1684565c605a5582c903`;
    }

    // Fetch movies
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch((err) => console.error("Fetch error:", err));
  }, [page, search]);

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Movies..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Reset page to 1 when searching
        }}
        className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900 bg-opacity-60 backdrop-blur-md text-white fixed top-16 left-1/2 transform -translate-x-1/2 z-10"
      />

      {/* Movie Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-32 mx-10">
        {movies.length > 0 ? (
          movies.map((movie) => <Moviecard movie={movie} key={movie.id} />)
        ) : (
          <p className="text-white col-span-full text-center mt-10">
            No movies found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagenation-container flex justify-between mt-5 mx-10">
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
