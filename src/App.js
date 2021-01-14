import React, { useState } from 'react';

import Results from './components/Results';
import Nominations from './components/Nominations';
import Pagination from './components/Pagination';

import useFetch from './components/useFetch';

function App() {
  const [title, setTitle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nominations, setNominations] = useState([]);
  const { data } = useFetch(title, currentPage);
  const { searchResults, totalResults } = data;

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setTitle(e.target.title.value);
    setCurrentPage(1);
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

  const removeMovieFromNominations = (movieId) => {
    const newNominations = nominations.filter((movie) => movie.imdbID !== movieId);
    setNominations(newNominations);
  };

  return (
    <div>
      <h1>The Shoppies</h1>
      <form onSubmit={(e) => handleSearchSubmit(e)}>
        <input name="title" type="text" />
      </form>
      {searchResults ? (
        <Results
          searchResults={searchResults}
          title={title}
          addMovieToNominations={addMovieToNominations}
        />
      ) : (
        <h2>Search for Movies</h2>
      )}
      {searchResults && (
        <Pagination
          key={title}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          title={title}
          // getSearchResults={getSearchResults}
          totalResults={totalResults}
        />
      )}
      <Nominations
        nominations={nominations}
        removeMovieFromNominations={removeMovieFromNominations}
      />
    </div>
  );
}

export default App;
