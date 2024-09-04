import React from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (action: string, page?: number) => void;
  totalItems: number | undefined;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalItems,
}) => {
  //page Size by default 10

  const totalPages = totalItems ? Math.ceil(totalItems / 10) : 10;
  //Generate array of pages to map over
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      {/* Pagination (optional) */}
      {totalItems && onPageChange && (
        <div className="space-x-6 text-lg">
             {/* Previous Button */}
      <button
        className={`text-secondary ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => onPageChange("previous")}
        disabled={currentPage === 1}
      >
        Previous
      </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`text-secondary ${currentPage === page ? "font-bold" : ""}`}
          onClick={() => onPageChange("specific", page)}
        >
          {page}
        </button>
      ))}

<button
        className={`text-secondary ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => onPageChange("next", currentPage)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
