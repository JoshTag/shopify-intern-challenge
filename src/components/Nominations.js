import React from 'react';
import PropTypes from 'prop-types';

const Nominations = ({ nominations, removeMovieFromNominations }) => (
  <div>
    <h2>Nominations</h2>
    <ul>
      {nominations
        ? nominations.map((movie) => (
            <li key={movie.imdbID}>
              {movie.Title} {movie.Year}{' '}
              <button type="submit" onClick={() => removeMovieFromNominations(movie.imdbID)}>
                Delete
              </button>
            </li>
          ))
        : 'Select a movie to nominate'}
    </ul>
  </div>
);
Nominations.propTypes = {
  nominations: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      imdbID: PropTypes.string.isRequired,
      Type: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeMovieFromNominations: PropTypes.func.isRequired,
};

export default Nominations;
