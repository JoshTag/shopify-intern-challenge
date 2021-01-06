import React from 'react';
import PropTypes from 'prop-types';

const Results = ({ searchResults, title, addMovieToNominations }) => (
  <div>
    <h2>Results for {title}</h2>
    <ul>
      {searchResults &&
        searchResults.map((movie) => (
          <li key={movie.imdbID}>
            <span>
              {movie.Title} ({movie.Year}){' '}
              <button type="submit" onClick={() => addMovieToNominations(movie)}>
                Nominate
              </button>
            </span>
          </li>
        ))}
    </ul>
  </div>
);

Results.propTypes = {
  title: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      imdbID: PropTypes.string.isRequired,
      Type: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
    })
  ).isRequired,
  addMovieToNominations: PropTypes.func.isRequired,
};

export default Results;
