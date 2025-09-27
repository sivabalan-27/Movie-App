import React, { useEffect, useState } from "react";
import Moviecard from "../components/Moviecard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); 
  const [isSearching, setIsSearching] = useState(false); 

  const API_URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=`;
  const API_URL_SEARCH = `https://api.themoviedb.org/3/search/movie?language=en-US&query=`;

  const BEARER_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzg4ZTEyZWE2NjFiYjk0YjRmYWJhNzRiZDY1ZTY1NSIsIm5iZiI6MTc1ODgyNjUzNS4yNjMsInN1YiI6IjY4ZDU5MDI3OGVhYTBlNWI3YTY4YWJhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-_eyB_9nmDdtY3Dt8TxZMjV--UE2N6yDaaH_zPIvAE";

  useEffect(() => {
    const currentPage = page || 1;

    
    if (search.trim() === "") {
      setIsSearching(false);
      fetch(API_URL_POPULAR + currentPage, {
        headers: {
          Authorization: BEARER_TOKEN,
          accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setMovies(data.results || []))
    } 
    else {
      setIsSearching(true);
      fetch(API_URL_SEARCH + encodeURIComponent(search) + `&page=${currentPage}`, {
        headers: {
          Authorization: BEARER_TOKEN,
          accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setMovies(data.results || []))
    }
  }, [page, search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Movies..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Reset to page 1 whenever search changes
        }}
        className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900 bg-opacity-60 text-white fixed top-16 left-1/2 transform -translate-x-1/2"
      />

    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-32"> 
        {movies.map(movie =>{ 
            return (<Moviecard movie={movie} key={movie.title}/>); 
        } )}
    </div>


      <div className="flex justify-between mt-5 px-5">

        <button
          className="p-2 bg-gray-700 text-white rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((prev) =>prev - 1)} 
        >
          PREV
        </button>

        <button
          className="p-2 bg-gray-700 text-white rounded"
          onClick={() => setPage((prev) => prev + 1)}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Home;

