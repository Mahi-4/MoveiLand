import { useEffect, useState } from "react";

import './App.css';
import MovieCard from "./MovieCard";
import Search from './search.svg';

// e66b5e3b

const API_URL = 'http://www.omdbapi.com?apikey=e66b5e3b';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm , setSearchTerm]=useState('');

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
  
    setMovies(data.Search);
  }
  useEffect(() => {
    searchMovie('smurfs')
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search For Movies"
          value={searchTerm}
          onChange={(e) => { 
            setSearchTerm(e.target.value)
            searchMovie(e.target.value)}}
        />
        <img
          src={Search}
          alt="Search"
          onClick={() => {searchMovie(searchTerm) }}
        />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) =>
                <MovieCard movie={movie} />
              )}
            </div>
          ) : (
            <div>
              <h2>No Movies Found...!!!</h2>
            </div>

          )
      }



    </div>
  );
}


export default App;