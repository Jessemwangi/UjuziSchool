import React, { useState, useEffect } from 'react';

const PaginationTwo = ({ meta }) => {
  const { pagination } = meta;
  const { page, pageSize, pageCount, total } = pagination;

  const [currentPage, setCurrentPage] = useState(page);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setCurrentPage(newPage);
      // Update the URL to reflect the new page
      window.history.pushState({}, null, `/resources?page=${newPage}`);
    }
  };

  const renderPagination = () => {
    const paginationItems = [];

    // Previous button
    paginationItems.push(
      <li key="previous" className={currentPage === 1 ? 'disabled' : ''}>
        <a href={`/resources?page=${currentPage - 1}`} aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
          <i className="icon-west"></i>
        </a>
      </li>
    );

    // Page numbers
    for (let i = 1; i <= pageCount; i++) {
      paginationItems.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <a href={`/resources?page=${i}`} onClick={() => handlePageChange(i)}>{i}</a>
        </li>
      );
    }

    // Next button
    paginationItems.push(
      <li key="next" className={currentPage === pageCount ? 'disabled' : ''}>
        <a href={`/resources?page=${currentPage + 1}`} aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}>
          <i className="icon-east"></i>
        </a>
      </li>
    );

    return paginationItems;
  };

  useEffect(() => {
    // Update the URL to reflect the initial page
    window.history.pushState({}, null, `/resources?page=${currentPage}`);
  }, [currentPage]);

  return (
    <>
      <ul className="pagination">
        {renderPagination()}
      </ul>
    </>
  );
};

export default PaginationTwo;