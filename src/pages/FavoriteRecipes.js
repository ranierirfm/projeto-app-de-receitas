import React from 'react';
import PropTypes, { object } from 'prop-types';
import Header from '../components/Header';

function FavoriteRecipes(props) {
  const { history } = props;

  return (
    <>
      <Header history={ history } />
      <p>Página da Receitas Favoritas</p>
    </>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default FavoriteRecipes;
