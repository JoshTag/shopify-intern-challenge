/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { usePagination } from '@material-ui/lab/Pagination';

const Pagination = ({ totalResults, currentPage, setCurrentPage }) => {
  const { items } = usePagination({
    count: Math.ceil(Number(totalResults) / 10),
  });

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

        const pageNumberToBeSet = () => {
          let pageNumber = null;
          if (type === "previous") {
            pageNumber = currentPage - 1
          } else if (type === "next") {
            pageNumber = currentPage + 1
          } else if (type.includes("ellipsis")) {
            pageNumber = null
          } else {
            pageNumber = index
          }
          return pageNumber
        }

        return (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} onClick={() => setCurrentPage(pageNumberToBeSet)} aria-hidden="true">
            {children}
          </li>
        );
      })}
    </ul>
  );
};

Pagination.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalResults: PropTypes.string.isRequired
};

export default Pagination;
