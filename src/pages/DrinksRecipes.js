import React, { useContext } from 'react';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';

function DrinksRecipes() {
  const { drinksRecipes, drinkFiltered } = useContext(MyRecipesContext);
  const { drinkList, toggle } = drinkFiltered;

  const recipesList = toggle ? drinkList : drinksRecipes;

  return (
    <div className="card-container">
      {
        recipesList.map(({ strDrink, strDrinkThumb }, index) => (
          <div key={ strDrink } data-testid={ `${index}-recipe-card` } className="card">
            <img
              src={ strDrinkThumb }
              alt=""
              data-testid={ `${index}-card-img` }
              className="card-image"
            />
            <p data-testid={ `${index}-card-name` }>{strDrink}</p>
          </div>
        ))
      }
    </div>
  );
}

export default DrinksRecipes;
