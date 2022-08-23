import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';

function FoodsRecipes() {
  const { foodsRecipes, foodFiltered } = useContext(MyRecipesContext);
  const { foodList, toggle } = foodFiltered;

  const recipesList = toggle ? foodList : foodsRecipes;

  return (
    <div className="card-container">
      {
        recipesList.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Link
            to={ `foods/${idMeal}` }
            key={ strMeal }
            className="cards"
          >
            <div key={ strMeal } data-testid={ `${index}-recipe-card` } className="card">
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
      }
    </div>
  );
}

export default FoodsRecipes;
