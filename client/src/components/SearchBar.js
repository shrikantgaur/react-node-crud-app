import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Search contacts..."
        className="form-control mb-4"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
