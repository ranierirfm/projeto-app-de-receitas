import PropTypes, { object } from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes(props) {
  const { history } = props;

  const [transfArea, settransfArea] = useState(false);

  const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  function copiedLink() {
    if (transfArea === true) {
      return ' Link copied!';
    }
  }

  function filterRecipes() {
    if (favRecipes !== null || favRecipes.length !== 0) {
      return (
        favRecipes.map((
          { id, nationality, category, type, image, name }, i,
        ) => (
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
                onClick={ () => {
                  navigator.clipboard
                    .writeText(`${window.location.origin}/${type}s/${id}`);
                  settransfArea(true);
                } }
              >
                <img
                  src={ shareIcon }
                  alt="Share Icon"
                />
                {copiedLink()}
              </button>
              <button
                data-testid={ `${i}-horizontal-favorite-btn` }
                type="button"
                src={ blackHeartIcon }
              >
                <img
                  src={ blackHeartIcon }
                  alt="Favorite Icon"
                />
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
