import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';

function FoodsRecipes() {
  const {
    foodsRecipes,
    foodFiltered,
    setFoodFiltered,
    isSearch,
    setIsSearch,
  } = useContext(MyRecipesContext);
  const { foodList, toggle } = foodFiltered;
  const history = useHistory();

  const recipesList = toggle ? foodList : foodsRecipes;
  const recipesCard = (
    recipesList.map(({ idMeal, strMeal, strMealThumb }, index) => (
      <Link
        to={ `foods/${idMeal}` }
        key={ strMeal }
        className="cards"
      >
        <div
          key={ strMeal }
          data-testid={ `${index}-recipe-card` }
          className="recipe-card"
        >
          <img
            src={ strMealThumb }
            alt=""
            data-testid={ `${index}-card-img` }
            className="card-image"
          />
          <p data-testid={ `${index}-card-name` }>{strMeal}</p>
        </div>
      </Link>
    ))
  );

  useEffect(() => {
    if (recipesList.length === 1 && isSearch) {
      setFoodFiltered({ ...foodFiltered, toggle: false });
      setIsSearch(false);
      return history.push(`foods/${foodList[0].idMeal}`);
    }
  }, [foodList]);

  return (
    <div className="card-container">
      {
        recipesCard
      }
    </div>
  );
}

export default FoodsRecipes;
