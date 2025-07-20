import React, { useState } from "react";

const Pagination = ({ totalPages = 3 }) => {
  const [currentPage, setCurrentPage] = useState(2);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex justify-center m-4">
      <div className="flex border rounded overflow-hidden text-sm font-medium select-none bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">

        {/* Previous Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 transition ${currentPage === 1
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
            }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-2 border-l border-gray-300 dark:border-gray-600 transition ${currentPage === page
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-[var(--primary)]"
                }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 border-l border-gray-300 dark:border-gray-600 transition ${currentPage === totalPages
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 dark:bg-gray-600 text-[var(--primary)] hover:bg-gray-300 dark:hover:bg-gray-500"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );

};

export default Pagination;
