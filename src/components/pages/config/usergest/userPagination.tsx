import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const UserPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => (
  <div className="flex justify-center items-center mt-4">
    <button
      type="button"
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-3 py-1 mx-1 bg-gray-300 rounded-md transition duration-300 ease-in-out 
        ${totalPages > 1 ? 'hover:bg-orange-500' : ''} 
        disabled:opacity-50`}
    >
      Atrás
    </button>

    {[...Array(totalPages)].map((_, index) => (
      <button
        type="button"
        key={index + 1}
        onClick={() => paginate(index + 1)}
        className={`px-3 py-1 mx-1 rounded-md transition duration-300 ease-in-out 
          ${currentPage === index + 1
            ? 'bg-gray-900 text-white hover:bg-orange-500'
            : 'bg-gray-300 hover:bg-orange-500'}`}
      >
        {index + 1}
      </button>
    ))}

    <button
      type="button"
      onClick={() => paginate(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-3 py-1 mx-1 bg-gray-300 rounded-md transition duration-300 ease-in-out 
        ${totalPages > 1 ? 'hover:bg-orange-500' : ''} 
        disabled:opacity-50`}
    >
      Adelante
    </button>
  </div>
);

export default UserPagination;