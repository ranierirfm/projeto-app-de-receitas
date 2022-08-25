import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer
      className={ styles.footer }
      data-testid="footer"
    >
      <Link to="/drinks">
        <img
          className={ styles.drink }
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
        />
      </Link>

      <Link to="/foods">
        <img
          className={ styles.food }
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="food icon"
        />
      </Link>

    </footer>
  );
}
// teste

export default Footer;
