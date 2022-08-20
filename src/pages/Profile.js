import React from 'react';
import PropTypes, { object } from 'prop-types';
import Header from '../components/Header';

function Profile(props) {
  const { history } = props;

  return (
    <>
      <Header history={ history } />
      <p>Página de Perfil</p>
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default Profile;
