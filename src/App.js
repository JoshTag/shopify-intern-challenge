import React, { useState } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Results from './components/Results';
import Nominations from './components/Nominations';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function App() {
  const [title, setTitle] = useState();
  const [searchResults, setSearchResults] = useState(null);
  // const [totalResults, setTotalResults] = useState(null);
  const [nominations, setNominations] = useState([]);

  const searchMovies = async (movieTitle) => {
    const data = await axios.get(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movieTitle}&type=movie`
    );
    setTitle(movieTitle);
    setSearchResults(data.data.Search);
    // setTotalResults(data.data.totalResults);
  };

  const addMovieToNominations = (movie) => {
    const set = new Set(nominations.map((id) => id.imdbID));
    if (set.has(movie.imdbID)) {
      console.log('movie already added');
      return;
    }
    if (set.size === 5) {
      console.log('You already have 5 movies');
      return;
    }
    setNominations((prevState) => [...prevState, movie]);
  };

  // const removeMovieFromNominations

  return (
    <div>
      <h1>The Shoppies</h1>
      <Search searchMovies={searchMovies} />
      {searchResults ? (
        <Results
          searchResults={searchResults}
          title={title}
          addMovieToNominations={addMovieToNominations}
          // totalResults={totalResults}
        />
      ) : (
        <h2>Search for Movies</h2>
      )}
      <Nominations nominations={nominations} />
    </div>
  );
}

export default App;
