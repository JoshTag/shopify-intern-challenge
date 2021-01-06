import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchMovies }) => {
  const searchMovieTitle = (event) => {
    event.preventDefault();

    searchMovies(event.target.title.value);
  };

  return (
    <div>
      <form onSubmit={(e) => searchMovieTitle(e)}>
        <input name="title" type="text" />
      </form>
    </div>
  );
};

Search.propTypes = {
  searchMovies: PropTypes.func.isRequired,
};

export default Search;
