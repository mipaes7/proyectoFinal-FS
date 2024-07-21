import React from "react";

const MangaListPagination = ({ currentPage, totalPages, onPageChange }) => {
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <article className="pagination">
      <button className="pageBtn" onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span className="pageInfo">Page {currentPage} of {totalPages}</span>
      <button className="pageBtn" onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </article>
  );
};

export default MangaListPagination;
