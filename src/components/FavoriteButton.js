import React from 'react';
import PropTypes from 'prop-types';
import { addFavoriteStorage } from '../services/favoriteStorage';

function FavoriteButton(props) {
  console.log(props.dataRecipe);

  const addFavoriteRecipe = () => {
    const { dataRecipe, url } = props;

    const recipeToAdd = {
      id: url.includes('foods') ? dataRecipe.idMeal : dataRecipe.idDrink,
      type: url.includes('foods') ? 'food' : 'drink',
      nationality: dataRecipe.strArea ? dataRecipe.strArea : '',
      category: dataRecipe.strCategory ? dataRecipe.strCategory : '',
      alcoholicOrNot: dataRecipe.strAlcoholic ? dataRecipe.strAlcoholic : '',
      name: url.includes('foods') ? dataRecipe.strMeal : dataRecipe.strDrink,
      image: url.includes('foods') ? dataRecipe.strMealThumb : dataRecipe.strDrinkThumb,
    };
    addFavoriteStorage(recipeToAdd);
    console.log('clicou');
  };

function FavoriteButton() {
  // console.log(props.dataRecipe);
  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ addFavoriteRecipe }
    >
      Favoritar
    </button>
  );
}

FavoriteButton.propTypes = {
  url: PropTypes.string.isRequired,
  dataRecipe: PropTypes.shape(PropTypes.string.isRequired)
    .isRequired,
};

export default FavoriteButton;
