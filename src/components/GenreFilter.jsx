const GenreFilter = ({genreList,selectedGenre}) => {

    return (
        <select className="p-2 mb-4 bg-gray-900 bg-opacity-60  backdrop-blur-md text-white border rounded" onChange={(e) => selectedGenre(e.target.value)}>
            <option value="">All Genres</option>
          {genreList.map((genre) => {
            return(
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            );
        })}  

        </select>
    );
    }

export default GenreFilter;
