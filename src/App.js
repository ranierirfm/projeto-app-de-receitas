import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Recipes from './components/Recipes';
import MyRecipesProvider from './context/recipesContext/MyRecipesProvider';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <MyRecipesProvider>
        <Route exact path="/foods" component={ Recipes } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/profile" component={ Profile } />
      </MyRecipesProvider>
    </Switch>
  );
}

export default App;
