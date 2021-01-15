import { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const useFetch = (query, queryPage) => {
  const cache = useRef({});

  const initialState = {
    status: 'idle',
    error: null,
    data: [],
  };

  const [state, dispatch] = useReducer((results, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' };
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return results;
    }
  }, initialState);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });

      if (cache.current[`${query}-${queryPage}`]) {
        const data = cache.current[`${query}-${queryPage}`];
        dispatch({
          type: 'FETCHED',
          payload: { searchResults: data.data.Search, totalResults: data.data.totalResults },
        });
      } else {
        try {
          const data = await axios(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie&page=${queryPage}`
          );
          cache.current[`${query}-${queryPage}`] = data;
          dispatch({
            type: 'FETCHED',
            payload: { searchResults: data.data.Search, totalResults: data.data.totalResults },
          });
        } catch (error) {
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };

    fetchData();
  }, [query, queryPage]);

  return state;
};

export default useFetch;


/*
  TODO:
  move state to global context
  create hook usable in app and pagination

  material ui default buttons
*/