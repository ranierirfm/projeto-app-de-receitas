import PropTypes, { object } from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile(props) {
  const { history } = props;

  const getEmail = () => {
    const email = localStorage.getItem('user');
    const emailParse = JSON.parse(email);
    if (emailParse !== null) {
      return (
        <h1 className="profile-email" data-testid="profile-email">{emailParse.email}</h1>
      );
    }
    return (
      <h1 data-testid="profile-email">email</h1>
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header history={ history } />

      <section className="profile-container">
        { getEmail() }
        <button
          type="button"
          className="btn btn-primary"
          data-testid="profile-done-btn"
          id="Done Recipes"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          className="btn btn-primary"
          data-testid="profile-favorite-btn"
          id="Favorite Recipes"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          className="btn btn-primary"
          data-testid="profile-logout-btn"
          id="Logout"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </section>

      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default Profile;
