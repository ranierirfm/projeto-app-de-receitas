import React, { useContext } from 'react';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';
import Footer from './Footer';

function FilterFoodButtons() {
  const { foodsFilters, foodFiltered, setFoodFiltered } = useContext(MyRecipesContext);

  const selectFilter = async ({ target }) => {
    const { id } = target;
    const END_POINT = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`;
    const TWELVE = 12;
    const { meals } = await fetch(END_POINT).then((response) => response.json());
    setFoodFiltered({
      ...foodFiltered,
      foodList: meals.filter((_food, index) => index < TWELVE),
      toggle: id === foodFiltered.id ? !foodFiltered.toggle : true,
      id,
    });
  };

  return (
    <div className="filters-buttons">
      {
        foodsFilters.map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            className="btn btn-primary"
            data-testid={ `${strCategory}-category-filter` }
            id={ strCategory }
            onClick={ selectFilter }
          >
            { strCategory }
          </button>
        ))
      }
      <Footer />
    </div>
  );
}

export default FilterFoodButtons;
