import React from 'react';
import { Card } from 'react-bootstrap';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

class DoneRecipesCard extends React.Component {
  constructor() {
    super();

    this.state = {
      recipes: [{
        id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      }],
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
    const { recipes, isCopied } = this.state;

    return recipes.map((recipe, index) => {
      const {
        id, type, nationality, category, alcoholicOrNot, name, image, doneDate, tags,
      } = recipe;

      return (
        <Card key={ `done-recipes${id}` } className="recipe-card">
          <h4 data-testid={ `${index}-horizontal-name` }>{name}</h4>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
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

export default DoneRecipesCard;
