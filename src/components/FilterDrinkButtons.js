import React, { useContext } from 'react';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';

function FilterDrinkButtons() {
  const { drinksFilters } = useContext(MyRecipesContext);

  return (
    <div className="filters-buttons">
      {
        drinksFilters.map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => {} }
          >
            { strCategory }
          </button>
        ))
      }
    </div>
  );
}

export default FilterDrinkButtons;
