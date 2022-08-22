import PropTypes, { object } from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile(props) {
  const { history } = props;

  return (
    <>
      <Header history={ history } />
      <p>Página de Perfil</p>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default Profile;
