import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { toggleFavoriteAction } from '../redux/actions/myActions';
import {
  addFavoriteStorage,
  getFavoriteStorage,
  saveFavoriteStorage,
} from '../services/favoriteStorage';

function FavoriteButton(props) {
  const { dataRecipe, url, id, isFavorite, toggleFavorite } = props;
  console.log(id, isFavorite);
  useEffect(() => {
    const getFavorites = getFavoriteStorage();
    if (getFavorites) {
      return getFavorites
        .some((favoriteRecipe) => favoriteRecipe.id === id)
        ? toggleFavorite(true) : toggleFavorite(false);
    }
  }, []);

  const addFavoriteRecipe = () => {
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
    toggleFavorite(true);
  };

  const removeFavoriteRecipe = () => {
    const getFavorites = getFavoriteStorage();
    const updatedRecipe = getFavorites
      .filter((favoriteRecipe) => favoriteRecipe.id !== id);
    saveFavoriteStorage(updatedRecipe);
    toggleFavorite(false);
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ isFavorite ? removeFavoriteRecipe : addFavoriteRecipe }
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite Icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  dataRecipe: PropTypes.shape(PropTypes.string.isRequired)
    .isRequired,
};

const mapStateToProps = (store) => ({
  isFavorite: store.myReducer.isFavorite,
});

const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (payload) => dispatch(toggleFavoriteAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
