import React, { useContext } from 'react';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';

function FoodsRecipes() {
  const { foodsRecipes, foodFiltered } = useContext(MyRecipesContext);
  const { foodList, toggle } = foodFiltered;

  const recipesList = toggle ? foodList : foodsRecipes;

  return (
    <div className="card-container">
      {
        recipesList.map(({ strMeal, strMealThumb }, index) => (
          <div key={ strMeal } data-testid={ `${index}-recipe-card` } className="card">
            <img
              src={ strMealThumb }
              alt=""
              data-testid={ `${index}-card-img` }
              className="card-image"
            />
            <p data-testid={ `${index}-card-name` }>{strMeal}</p>
          </div>
        ))
      }
    </div>
  );
}

export default FoodsRecipes;
