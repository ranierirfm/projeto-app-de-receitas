import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyRecipesContext from './MyRecipesContext';

function MyRecipesProvider({ children }) {
  const [foodsRecipes, setFoodsRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);

  useEffect(() => {
    const fetchFoodAPI = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const TWELVE = 12;
      const { meals } = await fetch(URL).then((response) => response.json());
      setFoodsRecipes(meals.filter((_food, index) => index < TWELVE));
    };
    fetchFoodAPI();
  }, []);

  useEffect(() => {
    const fetchDrinksAPI = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const TWELVE = 12;
      const { drinks } = await fetch(URL).then((response) => response.json());
      setDrinksRecipes(drinks.filter((_drink, index) => index < TWELVE));
    };
    fetchDrinksAPI();
  }, []);

  const contextValue = {
    foodsRecipes,
    drinksRecipes,
  };
  return (
    <MyRecipesContext.Provider value={ contextValue }>
      { children }
    </MyRecipesContext.Provider>
  );
}

MyRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyRecipesProvider;
