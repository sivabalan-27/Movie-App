import React, { useContext, useState } from "react";
import { WatchListContext } from "../context/WatchListContext";
import Moviecard from "../components/Moviecard";

const Watchlist = () => {
  const { watchList } = useContext(WatchListContext);

  const [search, setSearch] = useState("");

  // 🔥 Safe filter (no crash)
  const filteredMovies = watchList.filter((movie) =>
    (movie?.Title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* 🔍 Search */}
      <div>
        <input
          type="text"
          placeholder="Search Movies..."
          className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900/60 backdrop-blur-md text-white fixed top-16 left-1/2 -translate-x-1/2 z-10"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🎬 Movies */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-32 mx-10">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Moviecard movie={movie} key={movie.imdbID} />
          ))
        ) : (
          <p className="text-white col-span-full text-center mt-10">
            No movies in watchlist.
          </p>
        )}
      </div>
    </>
  );
};

export default Watchlist;
