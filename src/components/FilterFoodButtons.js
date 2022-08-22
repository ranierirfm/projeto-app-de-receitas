import React, { useContext } from 'react';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';

function FilterFoodButtons() {
  const { foodsFilters } = useContext(MyRecipesContext);

  return (
    <div className="filters-buttons">
      {
        foodsFilters.map(({ strCategory }) => (
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

export default FilterFoodButtons;
