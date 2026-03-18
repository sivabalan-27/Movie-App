import React, { useContext,useState } from "react";
import GenreFilter from "../components/GenreFilter";
import { WatchListContext } from "../context/WatchListContext";
import Moviecard from "../components/Moviecard";


const watchlist = () => {
    const {watchList, genreList} = useContext(WatchListContext);
    const [Search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const filteredMovies = watchList.filter((movie) =>
        movie.title.toLowerCase().includes(Search.toLowerCase())
    ).filter((movie => {
        return !selectedGenre || movie.genre_ids.includes(parseInt(selectedGenre));
    }))
    return (
        <>
        <div>
            <input type="text" placeholder="Search Movies..." className="p-2 w-3/4 z-10 md:w-1/2 border rounded border-gray-700 bg-gray-900 bg-opacity-60 backdrop-blur-md text-white fixed top-16 left-1/2 transform -translate-x-1/2"
            onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="flex justify-center mt-32">
            <GenreFilter genreList={genreList} selectedGenre={setSelectedGenre} />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-32 mx-10"> 
        {filteredMovies.map((movie) =>{ 
            return <Moviecard movie={movie} key={movie.title}/>; 
        } )}
        </div>
        </>
        
    )
}

export default watchlist;
