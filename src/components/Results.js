import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from './Loader';

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Subheader = styled.h2`
  margin: 0;
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;

  & > li {
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  font-size: 13px;
  background: #1876d2;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  color: #fff;
  box-shadow: 0 4px 14px -1px rgba(0, 0, 0, 0.3);

  &:hover {
    cursor: pointer;
    background-color: #0056ab;
    box-shadow: 0 6px 16px -1px rgba(0, 0, 0, 0.4);
    transition: 0.3s;
  }

  &:disabled {
    background-color: #5d7892;
    color: #d0d0d0;
  }

  &:active,
  :focus {
    border: none;
    outline: 0;
  }
`;

const Results = ({ searchResults, title, nominations, addMovieToNominations, status }) => {
  const idSet = new Set(nominations.map((id) => id.imdbID));

  return (
    <Container>
      <Subheader>{title ? `Results for "${title}"` : 'Search for Movies'}</Subheader>
      {status === 'fetching' && (
        <>
          <Loader />
          <Loader />
          <Loader />
        </>
      )}
      <ResultList>
        {searchResults &&
          searchResults.map((movie) => {
            const disable = !!idSet.has(movie.imdbID);
            return (
              <li key={movie.imdbID}>
                <span>
                  {movie.Title} ({movie.Year}){' '}
                  <Button
                    type="button"
                    disabled={disable}
                    onClick={() => addMovieToNominations(movie)}
                  >
                    Nominate
                  </Button>
                </span>
              </li>
            );
          })}
      </ResultList>
      {typeof searchResults === 'undefined' && status === 'fetched' && (
        <span>There are no movies by that title</span>
      )}
    </Container>
  );
};

Results.propTypes = {
  title: PropTypes.string,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      Year: PropTypes.string,
      imdbID: PropTypes.string,
      Type: PropTypes.string,
      Poster: PropTypes.string,
    })
  ),
  addMovieToNominations: PropTypes.func,
  nominations: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      Year: PropTypes.string,
      imdbID: PropTypes.string,
      Type: PropTypes.string,
      Poster: PropTypes.string,
    })
  ),
  status: PropTypes.string,
};

export default Results;
