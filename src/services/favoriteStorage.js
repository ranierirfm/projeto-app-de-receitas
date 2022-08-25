const FAVORITE_RECIPES = 'favoriteRecipes';

if (!JSON.parse(localStorage.getItem(FAVORITE_RECIPES))) {
  localStorage.setItem(FAVORITE_RECIPES, JSON.stringify([]));
}

export const saveFavoriteStorage = (recipe) => localStorage
  .setItem(FAVORITE_RECIPES, JSON.stringify(recipe));

export const getFavoriteStorage = () => JSON.parse(localStorage
  .getItem(FAVORITE_RECIPES));

export const addFavoriteStorage = (recipe) => {
  if (recipe) {
    const recipesList = getFavoriteStorage();
    saveFavoriteStorage([...recipesList, recipe]);
  }
};
