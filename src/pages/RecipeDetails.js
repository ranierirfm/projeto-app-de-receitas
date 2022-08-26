import React from 'react';
import PropTypes from 'prop-types';
import { Carousel, CarouselItem } from 'react-bootstrap';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';
import RecomendationCard from '../components/RecomendationCards';
import StartRecipeButton from '../components/StartRecipeButton';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

class RecipeDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      dataRecipeDetails: [],
      ingredients: [],
      isFood: true,
    };
  }

  componentDidMount() {
    this.requestRecipeDetails();
  }

  requestRecipeDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const { match: { url } } = this.props;

    if (url.includes('foods')) {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      const filterIngredientsAndMeasure = Object.entries(meals[0]).filter((arr) => arr[0]
        .includes('strIngredient') || arr[0].includes('strMeasure'));

      return this.setState({
        dataRecipeDetails: [...meals],
        ingredients: [...filterIngredientsAndMeasure],
        isFood: true,
      });
    }
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json());
    const filterIngredientsAndMeasure = Object.entries(drinks[0]).filter((arr) => arr[0]
      .includes('strIngredient') || arr[0].includes('strMeasure'));

    return this.setState({
      dataRecipeDetails: drinks,
      ingredients: [...filterIngredientsAndMeasure],
      isFood: false,
    });
  }

  ingredientsToMerge = (ingredientsList, measureList) => (
    ingredientsList.reduce((acc, curr, index) => {
      if (curr[1]) {
        acc.push(`${curr[1]} - ${measureList[index][1]}`);
      }
      return acc;
    }, [])
  )

  makeListIngredients = (ingredientsMerged) => (
    ingredientsMerged.map((ingredient, index) => (
      <li
        key={ ingredient }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {ingredient}
      </li>
    ))
  )

  showFoodDetails = () => {
    const { dataRecipeDetails, ingredients } = this.state;
    const { match: { params: { id } } } = this.props;
    const { match: { url } } = this.props;
    const { drinksRecipes } = this.context;
    const SIX = 6;
    const drinkRecomendation = drinksRecipes.filter((_drink, index) => index < SIX)
      .map((drink) => {
        const { strAlcoholic, strDrinkThumb, strDrink, idDrink } = drink;
        return {
          type: strAlcoholic,
          thumb: strDrinkThumb,
          name: strDrink,
          id: idDrink,
        };
      });

    const ingredientsList = ingredients
      .filter((ingredient) => ingredient[0].includes('strIngredient'));
    const measureList = ingredients
      .filter((measure) => measure[0].includes('strMeasure'));
    const ingredientsMerged = this.ingredientsToMerge(ingredientsList, measureList);
    return dataRecipeDetails
      .map(
        ({
          idMeal, strMealThumb, strMeal, strCategory, strInstructions, strYoutube,
        }) => (
          <div key={ idMeal } className="details-page">
            <img
              src={ strMealThumb }
              alt="Product Recipe"
              data-testid="recipe-photo"
              className="recipe-details-photo"
            />
            <div>
              <FavoriteButton dataRecipe={ dataRecipeDetails[0] } url={ url } id={ id } />
              <ShareButton url={ url } />
            </div>
            <h4 data-testid="recipe-title">{strMeal}</h4>
            <p data-testid="recipe-category">{strCategory}</p>
            <ul>
              {
                this.makeListIngredients(ingredientsMerged)
              }
            </ul>
            <p data-testid="instructions">{strInstructions}</p>
            <iframe
              data-testid="video"
              src={ strYoutube.replace('watch?v=', 'embed/') }
              title="Recipe Video"
              width="450px"
              height="300px"
            />
            <Carousel className="carousel" variant="dark" interval={ 10000 }>
              <CarouselItem>
                <div className="recomendation-card">
                  {RecomendationCard(drinkRecomendation, '0')}
                  {RecomendationCard(drinkRecomendation, '1')}
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="recomendation-card">
                  {RecomendationCard(drinkRecomendation, '2')}
                  {RecomendationCard(drinkRecomendation, '3')}
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="recomendation-card">
                  {RecomendationCard(drinkRecomendation, '4')}
                  {RecomendationCard(drinkRecomendation, '5')}
                </div>
              </CarouselItem>
            </Carousel>
            <StartRecipeButton recipeId={ id } url={ url } />
          </div>
        ),
      );
  };

  showDrinkDetails = () => {
    const { dataRecipeDetails, ingredients } = this.state;
    const { foodsRecipes } = this.context;
    const { match: { params: { id } } } = this.props;
    const { match: { url } } = this.props;
    const SIX = 6;
    const foodRecomendation = foodsRecipes.filter((_food, index) => index < SIX)
      .map((food) => {
        const { strCategory, strMealThumb, strMeal, idMeal } = food;
        return {
          type: strCategory,
          thumb: strMealThumb,
          name: strMeal,
          id: idMeal,
        };
      });

    const ingredientsList = ingredients
      .filter((ingredient) => ingredient[0].includes('strIngredient'));
    const measureList = ingredients
      .filter((measure) => measure[0].includes('strMeasure'));
    const ingredientsMerged = this.ingredientsToMerge(ingredientsList, measureList);
    return dataRecipeDetails
      .map(({ idDrink, strDrinkThumb, strDrink, strAlcoholic, strInstructions }) => (
        <div key={ idDrink } className="details-page">
          <img
            src={ strDrinkThumb }
            alt="Product Recipe"
            data-testid="recipe-photo"
            className="recipe-details-photo"
          />
          <div>
            <FavoriteButton dataRecipe={ dataRecipeDetails[0] } url={ url } id={ id } />
            <ShareButton url={ url } />
          </div>
          <h4 data-testid="recipe-title">{strDrink}</h4>
          <p data-testid="recipe-category">{strAlcoholic}</p>
          <ul>
            {
              this.makeListIngredients(ingredientsMerged)
            }
          </ul>
          <p data-testid="instructions">{ strInstructions }</p>
          <Carousel className="carousel" variant="dark" interval={ 10000 }>
            <CarouselItem>
              <div className="recomendation-card">
                {RecomendationCard(foodRecomendation, '0')}
                {RecomendationCard(foodRecomendation, '1')}
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="recomendation-card">
                {RecomendationCard(foodRecomendation, '2')}
                {RecomendationCard(foodRecomendation, '3')}
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="recomendation-card">
                {RecomendationCard(foodRecomendation, '4')}
                {RecomendationCard(foodRecomendation, '5')}
              </div>
            </CarouselItem>
          </Carousel>
          <StartRecipeButton recipeId={ id } url={ url } />
        </div>
      ));
  };

  render() {
    const { isFood } = this.state;

    return (
      isFood ? this.showFoodDetails() : this.showDrinkDetails()
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

RecipeDetails.contextType = MyRecipesContext;

export default RecipeDetails;
