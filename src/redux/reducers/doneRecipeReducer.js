import { FILTER_ALL, FILTER_DRINKS, FILTER_FOODS } from '../actions/myActions';

const INITIAL_STATE = {
  doneRecipesFiltered: [],
};

function doneRecipesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FILTER_ALL:
    return {
      doneRecipesFiltered: action.payload };
  case FILTER_DRINKS:
    return {
      doneRecipesFiltered: action.payload.filter((item) => item.type === 'drink') };
  case FILTER_FOODS:
    return {
      doneRecipesFiltered: action.payload.filter((item) => item.type === 'food') };
  default:
    return state;
  }
}

export default doneRecipesReducer;
