import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NominationContainer = styled.div`
  background: #fff;
  border-radius: 3px;
  padding: 2rem 1rem;
  margin-top: 1rem;

  @media screen and (min-width: 1024px) {
    width: 46%;
  }
`;

const Subheader = styled.h2`
  margin: 0;
`;

const NominationList = styled.ul`
  list-style: none;
  padding: 0;

  & > li {
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  font-size: 13px;
  background: #fff;
  border: 1px solid #ff7d7d;
  border-radius: 3px;
  padding: 5px 10px;
  color: #ff7d7d;
  box-shadow: 0 4px 14px -1px rgba(0, 0, 0, 0.3);

  &:hover {
    cursor: pointer;
    background-color: #ff7d7d;
    color: #fff;
    box-shadow: 0 6px 16px -1px rgba(0, 0, 0, 0.4);
    transition: 0.3s;
  }

  &:disabled {
    background-color: #5d7892;
    color: #d0d0d0;
  }

  &:active, :focus {
    outline: 0;
  }
`

const Nominations = ({ nominations, removeMovieFromNominations }) => (
  <NominationContainer>
    <Subheader>Nominations</Subheader>
    <NominationList>
      {nominations
        ? nominations.map((movie) => (
            <li key={movie.imdbID}>
              {movie.Title} {movie.Year}{' '}
              <Button type="submit" onClick={() => removeMovieFromNominations(movie.imdbID)}>
                Delete
              </Button>
            </li>
          ))
        : 'Select a movie to nominate'}
    </NominationList>
  </NominationContainer>
);

Nominations.propTypes = {
  nominations: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      Year: PropTypes.string,
      imdbID: PropTypes.string,
      Type: PropTypes.string,
      Poster: PropTypes.string,
    })
  ),
  removeMovieFromNominations: PropTypes.func,
};

export default Nominations;
