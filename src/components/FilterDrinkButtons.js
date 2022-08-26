import React, { useContext } from 'react';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';
import Footer from './Footer';

function FilterDrinkButtons() {
  const { drinksFilters, drinkFiltered, setDrinkFiltered } = useContext(MyRecipesContext);

  const selectFilter = async ({ target }) => {
    const { id } = target;
    const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`;
    const TWELVE = 12;
    const { drinks } = await fetch(END_POINT).then((response) => response.json());
    setDrinkFiltered({
      ...drinkFiltered,
      drinkList: drinks.filter((_drink, index) => index < TWELVE),
      toggle: id === drinkFiltered.id ? !drinkFiltered.toggle : true,
      id,
    });
  };

  return (
    <div className="filters-buttons">
      {
        drinksFilters.map(({ strCategory }) => (
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

export default FilterDrinkButtons;
