import React from 'react';

function SearchBar() {
  return (
    <label htmlFor="search-input">
      <input
        type="text"
        name="search-input"
        id="search-input"
        data-testid="search-input"
      />
    </label>
  );
}

export default SearchBar;
