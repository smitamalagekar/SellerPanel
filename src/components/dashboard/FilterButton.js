import React from 'react'

function FilterButton({ option, activeFilter, onClick }) {
    return (
      <button
        onClick={() => onClick(option)}
        className={`px-4 py-2 rounded-full ${
          activeFilter === option ? "bg-yellow-400 text-white" : "bg-gray-100"
        }`}
        aria-label={`Filter by ${option}`}
      >
        {option}
      </button>
    );
  }

export default FilterButton