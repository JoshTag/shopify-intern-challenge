/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePagination } from '@material-ui/lab/Pagination';

const Pagination = ({ currentPage, setCurrentPage, title, getSearchResults, totalResults }) => {
  const { items } = usePagination({
    count: Math.ceil(Number(totalResults) / 10),
  });

  useEffect(() => {
    getSearchResults(title, currentPage);
  }, [currentPage]);

  return (
    <ul>
      {items.map(({ page, type, selected, ...item }, index) => {
        let children = null;

        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
          children = '…';
        } else if (type === 'page') {
          children = (
            <button type="button" style={{ fontWeight: selected ? 'bold' : undefined }} {...item}>
              {page}
            </button>
          );
        } else {
          children = (
            <button type="button" {...item}>
              {type}
            </button>
          );
        }

        return (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} onClick={() => setCurrentPage(index)} aria-hidden="true">
            {children}
          </li>
        );
      })}
    </ul>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  getSearchResults: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  totalResults: PropTypes.string.isRequired,
};

export default Pagination;
