import React from 'react';
import PropTypes, { object } from 'prop-types';
import Header from '../components/Header';

function DoneRecipes(props) {
  const { history } = props;

  return (
    <>
      <Header history={ history } />
      <p>Página de Receitas Prontas</p>
    </>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default DoneRecipes;
