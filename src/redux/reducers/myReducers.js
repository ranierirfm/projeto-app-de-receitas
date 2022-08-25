import { TOGGLE_FAVORITE_ACTION } from '../actions/myActions';

const INITIAL_STATE = {
  isFavorite: false,
};

function myReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOGGLE_FAVORITE_ACTION:
    return { ...state, isFavorite: !state.isFavorite };
  default:
    return state;
  }
}

export default myReducer;
