import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { getInProgressRecipe,
  saveInProgressRecipe } from '../services/inProgressRecipeStorage';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';

function RecipeInProgress(props) {
  const [doneIngredients, setDoneIngredients] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const { match: { url } } = props;
  const urlPart = history.location.pathname.split('/');
  const idRecipe = urlPart[2];
  const { getRecipeApi,
    getRecipe,
    ingredients,
    isFood,
    ingredientsToMerge } = useContext(MyRecipesContext);
  let ingrMerged;

  const changeRoute = () => {
    history.push('/done-recipes');
  };

  const handleIngredientsDone = ({ target }) => {
    const { id } = target;
    let recipes = getInProgressRecipe();
    if (recipes[idRecipe]) {
      if (recipes[idRecipe].some((ingredient) => ingredient === Number(id) + 1)) {
        const ingredientFilter = recipes[idRecipe]
          .filter((ingredient) => ingredient !== Number(id) + 1);
        recipes = { ...recipes, [idRecipe]: [...ingredientFilter] };
      } else {
        recipes = { ...recipes, [idRecipe]: [...recipes[idRecipe], Number(id) + 1] };
      }
    } else {
      recipes = { ...recipes, [idRecipe]: [Number(id) + 1] };
    }
    saveInProgressRecipe(recipes);
    setDoneIngredients(recipes);
  };

  const makeListIngredients = (ingredientsMerged) => (
    ingredientsMerged.map((ingredient, index) => (
      <div key={ ingredient }>
        <label htmlFor={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            type="checkbox"
            id={ index }
            value={ ingredient }
            onChange={ handleIngredientsDone }
            checked={ !doneIngredients[idRecipe]
              ? false : doneIngredients[idRecipe]
                .some((ing) => ing === index + 1) }
          />
          {ingredient}
        </label>
      </div>
    ))
  );

  const showDrinksRecipe = () => {
    const ingredientsList = ingredients
      .filter((ingredient) => ingredient[0].includes('strIngredient'));
    const measureList = ingredients
      .filter((measure) => measure[0].includes('strMeasure'));
    const ingredientsMerged = ingredientsToMerge(ingredientsList, measureList);
    ingrMerged = ingredientsMerged.length;
    return (
      getRecipe.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb }
            alt=""
          />
          <p data-testid="recipe-title">{ recipe.strDrink }</p>
          <FavoriteButton url={ url } id={ idRecipe } dataRecipe={ getRecipe[0] } />
          <ShareButton url={ `/drinks/${idRecipe}` } />
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <ul>
            {
              makeListIngredients(ingredientsMerged)
            }
          </ul>

          <button
            type="button"
            id="button"
            data-testid="finish-recipe-btn"
            disabled={ isDisabled }
            onClick={ changeRoute }
          >
            Finalizar Receita
          </button>
        </div>
      )));
  };

  const showFoodRecipe = () => {
    const ingredientsList = ingredients
      .filter((ingredient) => ingredient[0].includes('strIngredient'));
    const measureList = ingredients
      .filter((measure) => measure[0].includes('strMeasure'));
    const ingredientsMerged = ingredientsToMerge(ingredientsList, measureList);
    ingrMerged = ingredientsMerged.length;
    return (
      getRecipe.map((recipe) => (
        <div key={ recipe.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            alt=""
          />
          <p data-testid="recipe-title">{ recipe.strMeal }</p>
          <FavoriteButton url={ url } id={ idRecipe } dataRecipe={ getRecipe[0] } />
          <ShareButton url={ `/foods/${idRecipe}` } />
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <ul>
            {
              makeListIngredients(ingredientsMerged)
            }
          </ul>

          <button
            type="button"
            id="button"
            data-testid="finish-recipe-btn"
            disabled={ isDisabled }
            onClick={ changeRoute }
          >
            Finalizar Receita
          </button>
        </div>
      )));
  };

  useEffect(() => {
    getRecipeApi(idRecipe, url);
  }, []);

  useEffect(() => {
    const recipes = getInProgressRecipe();
    setDoneIngredients(recipes);
  }, []);

  useEffect(() => (
    doneIngredients[idRecipe]?.length === ingrMerged
      ? setIsDisabled(false) : setIsDisabled(true)
  ));

  return (
    isFood ? showFoodRecipe() : showDrinksRecipe()
  );
}

export default RecipeInProgress;
