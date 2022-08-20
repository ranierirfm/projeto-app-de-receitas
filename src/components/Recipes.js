import React from 'react';
import PropTypes, { object } from 'prop-types';
import DrinksRecipes from '../pages/DrinksRecipes';
import FoodsRecipes from '../pages/FoodsRecipes';

function Recipes(props) {
  const { history } = props;

  return history.location.pathname === '/foods'
    ? <FoodsRecipes />
    : <DrinksRecipes />;
}

Recipes.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default Recipes;
