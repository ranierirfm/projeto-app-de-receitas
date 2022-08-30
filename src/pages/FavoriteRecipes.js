import PropTypes, { object } from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { saveFavoriteStorage } from '../services/favoriteStorage';

function FavoriteRecipes(props) {
  const { history } = props;
  const storageRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const [transfArea, settransfArea] = useState(false);
  const [favRecipes, setfavRecipes] = useState(storageRecipes);

  const filterFavoriteFoods = () => {
    const favoriteFoods = favRecipes.length > 0 ? favRecipes
      .filter((recipe) => recipe.type === 'food') : [];
    setfavRecipes(favoriteFoods);
  };

  const filterFavoriteDrinks = () => {
    const favoriteDrinks = favRecipes.length > 0 ? favRecipes
      .filter((recipe) => recipe.type === 'drink') : [];
    setfavRecipes(favoriteDrinks);
  };
  function showRecipes() {
    if (favRecipes !== null || favRecipes.length !== 0) {
      return (
        favRecipes.map((
          { id, nationality, category, alcoholicOrNot, type, image, name }, i,
        ) => {
          function copyUrl() {
            navigator.clipboard
              .writeText(`${window.location.origin}/${type}s/${id}`);

            settransfArea(true);
          }
          const removeFavoriteRecipe = () => {
            const getFavorites = favRecipes;
            const updatedRecipe = getFavorites
              .filter((favoriteRecipe) => favoriteRecipe.id !== id);
            saveFavoriteStorage(updatedRecipe);
            setfavRecipes(updatedRecipe);
          };
          return (
            <div key={ id }>
              <Link to={ `/${type}s/${id}` }>
                <img
                  data-testid={ `${i}-horizontal-image` }
                  src={ image }
                  alt={ name }
                  width="150px"
                  height="150px"
                />
              </Link>
              <div>
                <p
                  data-testid="1-horizontal-top-text"
                >
                  { alcoholicOrNot }

                </p>
                <p
                  data-testid={ `${i}-horizontal-top-text` }
                >
                  {`${nationality} - ${category}`}
                </p>
                <br />
                <Link to={ `/${type}s/${id}` }>
                  <p
                    data-testid={ `${i}-horizontal-name` }
                  >
                    { name }
                  </p>
                </Link>
              </div>

              <div>
                <button
                  src={ shareIcon }
                  type="button"
                  data-testid={ `${i}-horizontal-share-btn` }
                  onClick={ () => copyUrl() }
                >
                  <img
                    src={ shareIcon }
                    alt="Share Icon"
                  />
                  { transfArea === true ? ' Link copied!' : '' }
                </button>
                <button
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  type="button"
                  src={ blackHeartIcon }
                  onClick={ () => removeFavoriteRecipe() }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="Favorite Icon"
                  />
                </button>
              </div>
            </div>
          );
        }));
    }
  }

  return (
    <>
      <Header history={ history } />

      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          value="All"
          className="btn btn-primary"
          onClick={ () => setfavRecipes(storageRecipes) }
        >
          All
        </button>
        <button
          className="btn btn-primary"
          data-testid="filter-by-food-btn"
          type="button"
          value="Food"
          onClick={ filterFavoriteFoods }
        >
          Food
        </button>
        <button
          className="btn btn-primary"
          data-testid="filter-by-drink-btn"
          type="button"
          value="Drinks"
          onClick={ filterFavoriteDrinks }
        >
          Drinks
        </button>
      </section>
      {
        showRecipes()
      }
    </>
  );
}
FavoriteRecipes.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};
export default FavoriteRecipes;
