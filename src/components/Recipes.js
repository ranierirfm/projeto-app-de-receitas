import React from 'react';
import PropTypes, { object } from 'prop-types';
import DrinksRecipes from '../pages/DrinksRecipes';
import FoodsRecipes from '../pages/FoodsRecipes';
import Header from '../components/Header';

function Recipes(props) {
  const { history } = props;

  return (
    <div>
      <Header history={history}/>
      {history.location.pathname === '/foods'
    ? <FoodsRecipes />
    : <DrinksRecipes />}
    </div>
  )
}

Recipes.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default Recipes;
