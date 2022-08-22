import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyRecipesContext from './MyRecipesContext';

function MyRecipesProvider({ children }) {
  const [foodsRecipes, setFoodsRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [foodsFilters, setFoodsFilters] = useState([]);
  const [drinksFilters, setDrinksFilters] = useState([]);

  useEffect(() => {
    const fetchFoodsRecipes = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const TWELVE = 12;
      const { meals } = await fetch(URL).then((response) => response.json());
      setFoodsRecipes(meals.filter((_food, index) => index < TWELVE));
    };
    fetchFoodsRecipes();
  }, []);

  useEffect(() => {
    const fetchDrinksRecipes = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const TWELVE = 12;
      const { drinks } = await fetch(URL).then((response) => response.json());
      setDrinksRecipes(drinks.filter((_drink, index) => index < TWELVE));
    };
    fetchDrinksRecipes();
  }, []);

  useEffect(() => {
    const fetchFoodsFilters = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const FIVE = 5;
      const { meals } = await fetch(URL).then((response) => response.json());
      setFoodsFilters(meals.filter((_filter, index) => index < FIVE));
    };
    fetchFoodsFilters();
  }, []);

  useEffect(() => {
    const fetchDrinksFilters = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const FIVE = 5;
      const { drinks } = await fetch(URL).then((response) => response.json());
      setDrinksFilters(drinks.filter((_filter, index) => index < FIVE));
    };
    fetchDrinksFilters();
  }, []);

  const contextValue = {
    foodsRecipes,
    drinksRecipes,
    foodsFilters,
    drinksFilters,
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
