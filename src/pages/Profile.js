import PropTypes, { object } from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile(props) {
  const { history } = props;

  // const email = localStorage.getItem('user');
  // const emailParse = JSON.parse(email);
  return (
    <>
      <Header history={ history } />
      <p>Página de Perfil</p>
      <h1 data-testid="profile-email">email</h1>

      <button
        type="button"
        data-testid="profile-done-btn"
        id="Done Recipes"
      >
        Done Recipes

      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        id="Favorite Recipes"
      >
        Favorite Recipes

      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        id="Logout"
      >
        Logout

      </button>

      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default Profile;
