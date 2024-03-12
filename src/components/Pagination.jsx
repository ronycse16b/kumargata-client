import React, { useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [selectedPage, setSelectedPage] = useState(currentPage);

  const handlePageChange = (page) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  return (
    <div className="join">
      {[...Array(totalPages).keys()].map((page) => (
        <input
          key={page}
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label={page + 1}
          checked={selectedPage === page + 1}
          onChange={() => handlePageChange(page + 1)}
        />
      ))}
    </div>
  );
};

export default Pagination;
