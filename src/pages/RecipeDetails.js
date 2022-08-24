import React from 'react';
import PropTypes from 'prop-types';
import MyRecipesContext from '../context/recipesContext/MyRecipesContext';
import RecomendationCard from '../components/RecomendationCards';

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
        { ingredient }
      </li>
    ))
  )

  showFoodDetails = () => {
    const { dataRecipeDetails, ingredients } = this.state;
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
        ({ idMeal, strMealThumb, strMeal, strCategory, strInstructions, strYoutube }) => (
          <div key={ idMeal }>
            <img
              src={ strMealThumb }
              alt="Product Recipe"
              data-testid="recipe-photo"
              className="recipe-details-photo"
            />
            <h4 data-testid="recipe-title">{ strMeal }</h4>
            <p data-testid="recipe-category">{ strCategory }</p>
            <ul>
              {
                this.makeListIngredients(ingredientsMerged)
              }
            </ul>
            <p data-testid="instructions">{ strInstructions }</p>
            <iframe
              data-testid="video"
              src={ strYoutube.replace('watch?v=', 'embed/') }
              title="Recipe Video"
              width="450px"
              height="300px"
            />
            <RecomendationCard recomendation={ drinkRecomendation } />
          </div>
        ),
      );
  };

  showDrinkDetails = () => {
    const { dataRecipeDetails, ingredients } = this.state;
    const { foodsRecipes } = this.context;
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
        <div key={ idDrink }>
          <img
            src={ strDrinkThumb }
            alt="Product Recipe"
            data-testid="recipe-photo"
            className="recipe-details-photo"
          />
          <h4 data-testid="recipe-title">{ strDrink }</h4>
          <p data-testid="recipe-category">{ strAlcoholic }</p>
          <ul>
            {
              this.makeListIngredients(ingredientsMerged)
            }
          </ul>
          <p data-testid="instructions">{ strInstructions }</p>
          <RecomendationCard recomendation={ foodRecomendation } />
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
