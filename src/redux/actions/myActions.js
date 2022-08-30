export const TOGGLE_FAVORITE_ACTION = 'TOGGLE_FAVORITE_ACTION';
export const FILTER_ALL = 'ALL';
export const FILTER_DRINKS = 'DRINKS';
export const FILTER_FOODS = 'FOODS';

export const toggleFavoriteAction = (payload) => (
  { type: TOGGLE_FAVORITE_ACTION, payload });

export const doneRecipesAction = (type, payload) => ({
  type,
  payload,
});

export const doneRecipesDrinksAction = (payload) => ({
  type: FILTER_DRINKS,
  payload,
});

export const doneRecipesFoodsAction = (payload) => ({
  type: FILTER_FOODS,
  payload,
});
