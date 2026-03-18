import React, { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WatchListContext } from "../context/WatchListContext";

const Moviecard = ({ movie }) => {
  const { watchList, toggleWatchList } = useContext(WatchListContext);

  // ✅ Use imdbID instead of id
  const inWatchList =
    Array.isArray(watchList) &&
    watchList.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white relative hover:scale-105 transition duration-300">
      
      {/* 🔥 Poster Fix */}
      <img
        className="w-full h-80 object-cover rounded"
        src={
          movie?.Poster && movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie?.Title}
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/300x450?text=No+Image";
        }}
      />

      {/* ❤️ Watchlist Button */}
      <button
        className="absolute top-3 right-3 text-red-500 text-xl"
        onClick={() => toggleWatchList(movie)}
      >
        {inWatchList ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* 🎬 Movie Info */}
      <h3 className="text-lg font-bold mt-4 truncate">
        {movie?.Title || "No Title"}
      </h3>

      <p className="text-sm text-gray-400">
        {movie?.Year || "N/A"}
      </p>
    </div>
  );
};

export default Moviecard;
