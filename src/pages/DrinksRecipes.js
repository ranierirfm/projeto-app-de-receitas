import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';

function DrinksRecipes() {
  const { drinksRecipes, drinkFiltered } = useContext(MyRecipesContext);
  const { drinkList, toggle } = drinkFiltered;

  const recipesList = toggle ? drinkList : drinksRecipes;

  return (
    <div className="card-container">
      {
        recipesList.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <Link
            to={ `drinks/${idDrink}` }
            key={ strDrink }
            className="cards"
          >
            <div
              key={ strDrink }
              data-testid={ `${index}-recipe-card` }
              className="recipe-card"
            >
              <img
                src={ strDrinkThumb }
                alt=""
                data-testid={ `${index}-card-img` }
                className="card-image"
              />
              <p data-testid={ `${index}-card-name` }>{strDrink}</p>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

export default DrinksRecipes;
