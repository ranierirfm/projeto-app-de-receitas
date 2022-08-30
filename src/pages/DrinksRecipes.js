import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';

function DrinksRecipes() {
  const {
    drinksRecipes,
    drinkFiltered,
    setDrinkFiltered,
    isSearch,
    setIsSearch,
  } = useContext(MyRecipesContext);
  const { drinkList, toggle } = drinkFiltered;
  const history = useHistory();

  const recipesList = toggle ? drinkList : drinksRecipes;
  const recipesCard = (
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
  );

  useEffect(() => {
    if (recipesList.length === 1 && isSearch) {
      setDrinkFiltered({ ...drinkFiltered, toggle: false });
      setIsSearch(false);
      return history.push(`drinks/${drinkList[0].idDrink}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinkList]);

  return (
    <div className="card-container">
      {
        recipesCard
      }
    </div>
  );
}

export default DrinksRecipes;
