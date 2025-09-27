import React, { useContext } from "react";
import {Link} from "react-router-dom";
import { WatchListContext } from "../context/WatchListContext";

const Navbar = () => {
    const {watchList} = useContext(WatchListContext);
    return (
        <nav className="bg-gray-900 p-4 text-white flex z-10 justify-between fixed w-full top-0">
        <Link to="/" className="text-xl font-bold">Movie App</Link>
        <Link to="/watchlist" className="text-xl">Watchlist({watchList.length})</Link>
        </nav>
    )
}

export default Navbar;