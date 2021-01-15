import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';

const PaginationButtons = ({ totalResults, currentPage, setCurrentPage }) => {
  const pageCount = Math.ceil(Number(totalResults) / 10);

  const pageNumberToBeSet = (e, value) => {
    e.preventDefault();
    setCurrentPage(value);
  };

  return (
    <div>
      <Pagination
        count={pageCount}
        shape="rounded"
        page={currentPage}
        onChange={pageNumberToBeSet}
      />
    </div>
  );
};

PaginationButtons.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalResults: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default PaginationButtons;
