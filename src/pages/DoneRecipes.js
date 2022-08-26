import React from 'react';
import PropTypes, { object } from 'prop-types';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCards';

function DoneRecipes(props) {
  const { history } = props;

  return (
    <>
      <Header history={ history } />
      <Button
        variant="secondary"
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </Button>
      <Button
        variant="primary"
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </Button>
      <Button
        variant="primary"
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drink
      </Button>
      <DoneRecipesCard className="card-container" />
    </>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default DoneRecipes;
