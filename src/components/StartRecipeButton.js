/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getInProgressRecipe } from '../services/inProgressRecipeStorage';

function StartRecipeButton(props) {
  // const [recipeDone, setRecipeDone] = useState(false);
  // const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const { recipeId, url } = props;
  const history = useHistory();

  const recipeDone = !JSON.parse(
    localStorage.getItem('doneRecipes') || '[]',
  ).some(({ id }) => id === recipeId);

  const inProgressRecipe = !Object.keys(getInProgressRecipe())
    .some((id) => id === recipeId);

  return (
    recipeDone && (
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => { history.push(`${url}/in-progress`); } }
        className={ inProgressRecipe
          ? 'progress-recipe btn btn-info' : 'progress-recipe btn btn-success' }
      >
        {inProgressRecipe ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    )
  );
}

StartRecipeButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default StartRecipeButton;
