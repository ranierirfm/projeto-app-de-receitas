import { combineReducers } from 'redux';
import doneRecipesReducer from './doneRecipeReducer';
import myReducer from './myReducers';

const rootReducer = combineReducers({ myReducer, doneRecipesReducer });

export default rootReducer;
