import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyRecipesContext from './MyRecipesContext';

function MyRecipesProvider({ children }) {
  const [foodsRecipes, setFoodsRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [foodsFilters, setFoodsFilters] = useState([]);
  const [drinksFilters, setDrinksFilters] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [foodFiltered, setFoodFiltered] = useState({
    foodList: [], toggle: false, id: '' });
  const [drinkFiltered, setDrinkFiltered] = useState({
    drinkList: [], toggle: false, id: '' });

  const [getRecipe, setGetRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isFood, setIsFood] = useState(true);

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

  const getRecipeApi = async (id, url) => {
    if (url.includes('foods')) {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      setGetRecipe(meals);
      const filterIngredientsAndMeasure = Object.entries(meals[0]).filter((arr) => arr[0]
        .includes('strIngredient') || arr[0].includes('strMeasure'));
      setIngredients([...filterIngredientsAndMeasure]);
      setIsFood(true);
    }
    if (url.includes('drinks')) {
      const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      setGetRecipe(drinks);
      const filterIngredientsAndMeasure = Object.entries(drinks[0]).filter((arr) => arr[0]
        .includes('strIngredient') || arr[0].includes('strMeasure'));
      setIngredients([...filterIngredientsAndMeasure]);
      setIsFood(false);
    }
  };

  const contextValue = {
    foodsRecipes,
    drinksRecipes,
    foodsFilters,
    drinksFilters,
    foodFiltered,
    setFoodFiltered,
    drinkFiltered,
    setDrinkFiltered,
    isSearch,
    setIsSearch,
    getRecipeApi,
    getRecipe,
    ingredients,
    isFood,
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
