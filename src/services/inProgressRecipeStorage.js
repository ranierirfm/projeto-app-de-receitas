const IN_PROGRESS_RECIPE = 'inProgressRecipes';

if (!JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPE))) {
  localStorage.setItem(IN_PROGRESS_RECIPE, JSON.stringify({}));
}

export const saveInProgressRecipe = (recipe) => localStorage
  .setItem(IN_PROGRESS_RECIPE, JSON.stringify(recipe));

export const getInProgressRecipe = () => JSON.parse(localStorage
  .getItem(IN_PROGRESS_RECIPE));

export const addInProgressRecipe = ({ recipe }) => {
  if (recipe) {
    const recipesList = getInProgressRecipe();
    return saveInProgressRecipe({ ...recipesList, recipe });
  }
};
