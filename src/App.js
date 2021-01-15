import React, { useState } from 'react';

import Results from './components/Results';
import Nominations from './components/Nominations';
import PaginationButtons from './components/Pagination';

import useFetch from './components/useFetch';

function App() {
  const [title, setTitle] = useState(null);
  const [nominations, setNominations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useFetch(title, currentPage);
  const { searchResults, totalResults } = data;

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setTitle(e.target.title.value);
    setCurrentPage(1);
  };

  const pageToBeSet = (type, index) => {
    if (type === 'previous') {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (type === 'next') {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      setCurrentPage(index);
    }
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
        <PaginationButtons
          // key={title}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          title={title}
          totalResults={totalResults}
          pageToBeSet={pageToBeSet}
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
