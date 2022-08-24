import React, { useEffect, useState } from 'react';

function StartRecipeButton(props) {
  const [doneRecipe, setDoneRecipe] = useState(false);
  const { recipeId } = props;

  useEffect(() => {
    const getRecipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getRecipesDone) {
      return getRecipesDone
        .some(({ id }) => id === recipeId) && setDoneRecipe(true);
    }
  }, []);

  const startRecipe = (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe-button"
    >
      Start Recipe
    </button>);

  return (
    !doneRecipe ? startRecipe : null
  );
}

export default StartRecipeButton;
