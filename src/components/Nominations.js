import React from 'react';
import PropTypes from 'prop-types';

const Nominations = ({ nominations }) => {
  console.log(nominations);
  return (
    <div>
      <h2>Nominations</h2>
      <ul>
        {nominations
          ? nominations.map((item) => (
              <li key={item.imdbID}>
                {item.Title} {item.Year} <div>Delete</div>
              </li>
            ))
          : 'Select a movie to nominate'}
      </ul>
    </div>
  );
};

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
};

export default Nominations;
