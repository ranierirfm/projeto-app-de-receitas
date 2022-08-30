import React from 'react';
import { Card } from 'react-bootstrap';
import clipboardCopy from 'clipboard-copy';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

class DoneRecipesCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isCopied: false,
    };
  }

  copyUrl = (type, id) => {
    clipboardCopy(`http://localhost:3000${`/${type}s/${id}`}`);

    this.setState({
      isCopied: true,
    });
  };

  createCard = () => {
    const { isCopied } = this.state;
    const { doneRecipes: recipes } = this.props;

    return recipes.map((recipe, index) => {
      const {
        id, type, nationality, category, alcoholicOrNot, name, image, doneDate, tags,
      } = recipe;

      return (
        <Card key={ `done-recipes${id}` } className="recipe-card">
          <Link to={ `/${type}s/${id}` }>
            <h4 data-testid={ `${index}-horizontal-name` }>{name}</h4>
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
              className="recomendation-img"
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {type === 'food' ? (`${nationality} - ${category}`) : alcoholicOrNot}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            RecipeDone in:
            {' '}
            {doneDate}
          </p>
          <label htmlFor="share-icon">
            <input
              type="image"
              src={ shareIcon }
              alt="Share Icon"
              name="share-icon"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => this.copyUrl(type, id) }
            />
            { isCopied && <p>Link copied!</p> }
          </label>
          {type === 'food' && (tags.length === 1 ? (
            <div>
              <span data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{tags[0]}</span>
            </div>
          )
            : (
              <div>
                <span data-testid={ `${index}-${tags[0]}-horizontal-tag` }>
                  {tags[0]}
                </span>
                <span data-testid={ `${index}-${tags[1]}-horizontal-tag` }>
                  {`, ${tags[1]}`}
                </span>
              </div>
            ))}
        </Card>
      );
    });
  }

  render() {
    return (
      <>
        {this.createCard()}
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  doneRecipes: store.doneRecipesReducer.doneRecipesFiltered,
});

DoneRecipesCard.propTypes = {
  doneRecipes: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(DoneRecipesCard);
