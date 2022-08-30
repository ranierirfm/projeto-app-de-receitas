import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCards';
import localStorageFake from '../services/localStorageFake';
import {
  doneRecipesAction, FILTER_ALL, FILTER_DRINKS, FILTER_FOODS,
} from '../redux/actions/myActions';

function DoneRecipes(props) {
  const { history, dispatchRecipes } = props;

  const [recipes, setRecipes] = useState({});

  const doneRecipesStorage = JSON.parse(localStorageFake);

  const recoverLocalStorage = () => {
    setRecipes({
      recipesDone: doneRecipesStorage,
    });
    dispatchRecipes(FILTER_ALL, doneRecipesStorage);
  };

  const handleFoodBtn = (type) => {
    const { recipesDone } = recipes;

    dispatchRecipes(type, recipesDone);
  };

  useEffect(() => {
    recoverLocalStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header history={ history } />
      <Button
        variant="secondary"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleFoodBtn(FILTER_ALL) }
      >
        All
      </Button>
      <Button
        variant="primary"
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleFoodBtn(FILTER_FOODS) }
      >
        Food
      </Button>
      <Button
        variant="primary"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFoodBtn(FILTER_DRINKS) }
      >
        Drink
      </Button>
      <DoneRecipesCard className="card-container" />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes: (type, recipes) => (dispatch(doneRecipesAction(type, recipes))),
});

DoneRecipes.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
  dispatchRecipes: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DoneRecipes);
