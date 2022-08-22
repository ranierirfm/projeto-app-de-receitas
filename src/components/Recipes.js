import React from 'react';
import PropTypes, { object } from 'prop-types';
import DrinksRecipes from '../pages/DrinksRecipes';
import FoodsRecipes from '../pages/FoodsRecipes';
import Header from './Header';
import FilterFoodButtons from './FilterFoodButtons';
import FilterDrinkButtons from './FilterDrinkButtons';

function Recipes(props) {
  const { history } = props;
  const { location: { pathname } } = history;

  return (
    <div>
      <Header history={ history } />
      {pathname === '/foods'
        ? <FilterFoodButtons />
        : <FilterDrinkButtons />}
      {pathname === '/foods'
        ? <FoodsRecipes />
        : <DrinksRecipes />}
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default Recipes;
