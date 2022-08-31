import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { getInProgressRecipe,
  saveInProgressRecipe } from '../services/inProgressRecipeStorage';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';

function RecipeInProgress(props) {
  // const [getRecipe, setGetRecipe] = useState([]);
  // const [ingredients, setIngredients] = useState([]);
  // const [isFood, setIsFood] = useState(true);
  const [doneIngredients, setDoneIngredients] = useState({});
  const history = useHistory();
  const { match: { url } } = props;
  const urlPart = history.location.pathname.split('/');
  const idRecipe = urlPart[2];
  const { getRecipeApi, getRecipe, ingredients, isFood } = useContext(MyRecipesContext);

  // const getRecipeApi = async () => {
  //   if (url.includes('foods')) {
  //     const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlPart[2]}`)
  //       .then((response) => response.json());
  //     setGetRecipe(meals);
  //     const filterIngredientsAndMeasure = Object.entries(meals[0]).filter((arr) => arr[0]
  //       .includes('strIngredient') || arr[0].includes('strMeasure'));
  //     setIngredients([...filterIngredientsAndMeasure]);
  //     setIsFood(true);
  //   }
  //   if (url.includes('drinks')) {
  //     const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${urlPart[2]}`)
  //       .then((response) => response.json());
  //     setGetRecipe(drinks);
  //     const filterIngredientsAndMeasure = Object.entries(drinks[0]).filter((arr) => arr[0]
  //       .includes('strIngredient') || arr[0].includes('strMeasure'));
  //     setIngredients([...filterIngredientsAndMeasure]);
  //     setIsFood(false);
  //   }
  // };

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

  const ingredientsToMerge = (ingredientsList, measureList) => (
    ingredientsList.reduce((acc, curr, index) => {
      if (curr[1]) {
        acc.push(`${curr[1]} - ${measureList[index][1]}`);
      }
      return acc;
    }, [])
  );

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
    return (
      getRecipe.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb }
            alt=""
          />
          <p data-testid="recipe-title">{ recipe.strDrink }</p>
          <FavoriteButton url={ url } id={ urlPart[2] } dataRecipe={ getRecipe[0] } />
          <ShareButton url={ `/drinks/${urlPart[2]}` } />
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
            onClick={ () => {} }
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
    return (
      getRecipe.map((recipe) => (
        <div key={ recipe.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            alt=""
          />
          <p data-testid="recipe-title">{ recipe.strMeal }</p>
          <FavoriteButton url={ url } id={ urlPart[2] } dataRecipe={ getRecipe[0] } />
          <ShareButton url={ `/foods/${urlPart[2]}` } />
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
            onClick={ () => {} }
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

  return (
    isFood ? showFoodRecipe() : showDrinksRecipe()
  );
}

export default RecipeInProgress;
