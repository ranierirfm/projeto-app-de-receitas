import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';

function SearchBar(props) {
  const { url } = props;
  const [inputValue, setInputValue] = useState('');
  const [filterRadioType, setFilterRadioType] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { setFoodFiltered, setDrinkFiltered } = useContext(MyRecipesContext);

  useEffect(() => {
    if (inputValue && filterRadioType) return setIsDisabled(false);
    setIsDisabled(true);
  });

  const updateStateValue = ({ target }) => {
    const { value } = target;
    setFilterRadioType(value);
  };

  const searchFoodRecipe = async () => {
    if (filterRadioType === 'ingredient') {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`)
        .then((response) => response.json());
      setFoodFiltered({ foodList: [...meals], toggle: true, id: '' });
    }
    if (filterRadioType === 'name') {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then((response) => response.json());
      setFoodFiltered({ foodList: [...meals], toggle: true, id: '' });
    }
    if (filterRadioType === 'firstLetter' && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (filterRadioType === 'firstLetter' && inputValue.length === 1) {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`)
        .then((response) => response.json());
      setFoodFiltered({ foodList: [...meals], toggle: true, id: '' });
    }
    document.getElementById('search-input').value = '';
  };

  const searchDrinkRecipe = async () => {
    if (filterRadioType === 'ingredient') {
      const TWELVE = 12;
      const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`)
        .then((response) => response.json());
      setDrinkFiltered({
        drinkList: [...drinks.filter((_drink, index) => index < TWELVE)],
        toggle: true,
        id: '',
      });
    }
    if (filterRadioType === 'name') {
      const TWELVE = 12;
      const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then((response) => response.json());
      setDrinkFiltered({
        drinkList: [...drinks.filter((_drink, index) => index < TWELVE)],
        toggle: true,
        id: '',
      });
    }
    if (filterRadioType === 'firstLetter' && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (filterRadioType === 'firstLetter' && inputValue.length === 1) {
      const TWELVE = 12;
      const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`)
        .then((response) => response.json());
      setDrinkFiltered({
        drinkList: [...drinks.filter((_drink, index) => index < TWELVE)],
        toggle: true,
        id: '',
      });
    }
    document.getElementById('search-input').value = '';
  };

  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          name="search-input"
          id="search-input"
          data-testid="search-input"
          placeholder="Buscar..."
          onChange={ ({ target }) => setInputValue(target.value) }
        />
      </label>

      <label htmlFor="ingredient-radio">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          id="ingredient-radio"
          name="radio-search"
          onChange={ updateStateValue }
        />
        Ingredient
      </label>

      <label htmlFor="name-radio">
        <input
          type="radio"
          data-testid="name-search-radio"
          value="name"
          id="name-radio"
          name="radio-search"
          onChange={ updateStateValue }
        />
        Name
      </label>

      <label htmlFor="first-letter-radio">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          id="first-letter-radio"
          name="radio-search"
          onChange={ updateStateValue }
        />
        First Letter
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ url.includes('foods') ? searchFoodRecipe : searchDrinkRecipe }
        disabled={ isDisabled }
      >
        Search
      </button>

    </div>
  );
}

SearchBar.propTypes = {
  url: PropTypes.string.isRequired,
};

export default SearchBar;
