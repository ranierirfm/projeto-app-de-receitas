import PropTypes, { object } from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteRecipes(props) {
  const { history } = props;

  const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  function filterRecipes() {
    if (favRecipes !== null || favRecipes.length !== 0) {
      return (
        favRecipes.map((
          { id, type, category, image, name }, i,
        ) => (
          <div key={ id }>
            <img
              data-testid={ `${i}-horizontal-image` }
              src={ image }
              alt={ name }
              width="200px"
              height="200px"
            />
            <div>
              <p
                data-testid={ `${i}-horizontal-top-text` }
              >
                {`${type} - ${category}`}
              </p>
              <br />
              <p
                data-testid={ `${i}-horizontal-name` }
              >
                { name }
              </p>
            </div>

            <div>
              <button
                src={ shareIcon }
                type="button"
                data-testid={ `${i}-horizontal-share-btn` }
              >
                Compartilhar
              </button>
              <button
                data-testid={ `${i}-horizontal-favorite-btn` }
                type="button"
                src={ whiteHeartIcon }
              >
                Desfavoritar
              </button>
            </div>
          </div>
        )));
    }
  }

  return (
    <>
      <Header history={ history } />

      <p>Página da Receitas Favoritas</p>

      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          value="All"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          value="Food"
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          value="Drinks"
        >
          Drinks
        </button>
      </section>

      {
        filterRecipes()
      }

    </>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default FavoriteRecipes;
