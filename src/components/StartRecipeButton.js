/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StartRecipeButton(props) {
  const [recipeDone, setRecipeDone] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const { recipeId, url } = props;

  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getDoneRecipes) {
      return getDoneRecipes
        .some(({ id }) => id === recipeId) && setRecipeDone(true);
    }
  }, []);

  useEffect(() => {
    const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getInProgressRecipes && url.includes('foods')) {
      return Object.keys(getInProgressRecipes.meals)
        .some((id) => id === recipeId) && setInProgressRecipe(true);
    }
    if (getInProgressRecipes && url.includes('drinks')) {
      return Object.keys(getInProgressRecipes.cocktails)
        .some((id) => id === recipeId) && setInProgressRecipe(true);
    }
  });

  const startRecipe = (
    <Link
      to={ `${url}/in-progress` }
    >
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="progress-recipe btn btn-success"
      >
        Start Recipe
      </button>
    </Link>
  );

  const progressRecipe = (
    <Link
      to={ `${url}/in-progress` }
    >
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="progress-recipe btn btn-info"
      >
        Continue Recipe
      </button>
    </Link>
  );

  const showButton = () => {
    if (inProgressRecipe) return progressRecipe;
    if (!recipeDone) return startRecipe;
    return null;
  };

  return (
    showButton()
  );
}

export default StartRecipeButton;
