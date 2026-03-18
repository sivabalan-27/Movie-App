import React from "react";

const GenreFilter = ({ selectedType, setSelectedType }) => {
  return (
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      className="p-2 bg-gray-900 bg-opacity-60 backdrop-blur-md text-white border rounded outline-none"
    >
      <option value="">All</option>
      <option value="movie">Movies</option>
      <option value="series">Series</option>
      <option value="episode">Episodes</option>
    </select>
  );
};

export default GenreFilter;
