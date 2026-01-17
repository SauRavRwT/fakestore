import React from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar-container mb-4">
      <div className="input-group">
        <span className="input-group-text border-end-0">
          <FaSearch />
        </span>
        <input
          id="search-input"
          type="text"
          className="form-control border-start-0"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
