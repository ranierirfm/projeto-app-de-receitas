import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          name="search-input"
          id="search-input"
          data-testid="search-input"
          placeholder="Buscar..."
        />
      </label>

      <label htmlFor="ingredient-radio">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="Ingredient"
          id="ingredient-radio"
        />
        Ingredient
      </label>

      <label htmlFor="name-radio">
        <input
          type="radio"
          data-testid="name-search-radio"
          value="Name"
          id="name-radio"
        />
        Name
      </label>

      <label htmlFor="first-letter-radio">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="First Letter"
          id="first-letter-radio"
        />
        First Letter
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;
