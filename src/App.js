import React, { useState } from 'react';
import styled from 'styled-components';

import Results from './components/Results';
import Nominations from './components/Nominations';
import PaginationButtons from './components/PaginationButtons';
import Alert from './components/Alert';

import useFetch from './components/useFetch';

import search from './assets/icons/search.svg';

const PageContainer = styled.div`
  background: #efefef;
  min-height: 100vh;
`;

const Wrapper = styled.main`
  width: 300px;
  margin: 0 auto;
  padding-top: 2rem;
  position: relative;
    padding-bottom: 4rem;

  @media screen and (min-width: 768px) {
    width: 600px;
  }

  @media screen and (min-width: 1024px) {
    width: 990px;
  }
`;

const Header = styled.h1`
  margin: 0;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 2rem 1rem;
  border-radius: 3px;
`;

const InputContainers = styled.div`
  display: flex;
  margin-top: 5px;

  & input {
    flex-grow: 1;

    &:nth-child(1) {
      @media screen and (min-width: 768px) {
        flex-grow: 4;
      }
    }
  }
`;

const SearchInput = styled.input`
  background: url(${search}) no-repeat;
  background-position: 2% 50%;
  background-size: 15px;
  height: 25px;
  border: 1px #c3c3c3 solid;
  border-radius: 3px 0 0 3px;
  padding-left: 25px;

  @media screen and (min-width: 1024px) {
    background-position: 1% 50%;
  }
`;

const SubmitInput = styled.input`
  border: 1px #c3c3c3 solid;
  border-left: none;
  border-radius: 0 3px 3px 0;
  color: #fff;
  background: #1876d2;

  &:hover {
    cursor: pointer;
    background-color: #0056ab;
    box-shadow: 0 6px 16px -1px rgba(0, 0, 0, 0.4);
    transition: 0.3s;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  background: #fff;
  padding: 2rem 1rem;
  border-radius: 3px;

  @media screen and (min-width: 1024px) {
    width: 46%;
  }
`;

const ResultsNomination = styled.div`
  @media screen and (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
`;

function App() {
  const [title, setTitle] = useState(null);
  const [nominations, setNominations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState(false);
  const { data, status } = useFetch(title, currentPage);
  const { searchResults, totalResults } = data;

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setTitle(e.target.title.value);
    setCurrentPage(1);
  };

  const triggerAlert = () => {
    if (alert) {
      return;
    }
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const addMovieToNominations = (movie) => {
    if (nominations.length === 5) {
      triggerAlert();
      return;
    }
    setNominations((prevState) => [...prevState, movie]);
  };

  const removeMovieFromNominations = (movieId) => {
    const newNominations = nominations.filter((movie) => movie.imdbID !== movieId);
    setNominations(newNominations);
  };

  return (
    <PageContainer>
      <Wrapper>
        <Header>The Shoppies</Header>
        <Form onSubmit={(e) => handleSearchSubmit(e)}>
          <label>Movie Title</label>
          <InputContainers>
            <SearchInput required name="title" type="text" placeholder="Search Movie" />
            <SubmitInput type="submit" value="Search" />
          </InputContainers>
        </Form>
        <ResultsNomination>
          <ResultsContainer>
            <Results
              searchResults={searchResults}
              title={title}
              nominations={nominations}
              addMovieToNominations={addMovieToNominations}
              status={status}
            />
            {searchResults && (
              <PaginationButtons
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                title={title}
                totalResults={totalResults}
              />
            )}
          </ResultsContainer>
          <Nominations
            nominations={nominations}
            removeMovieFromNominations={removeMovieFromNominations}
          />
        </ResultsNomination>
        <Alert alert={alert} />
      </Wrapper>
    </PageContainer>
  );
}

export default App;
