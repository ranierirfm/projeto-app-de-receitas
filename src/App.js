import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Recipes from './components/Recipes';
import MyRecipesProvider from './context/recipesContext/MyRecipesProvider';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <MyRecipesProvider>
          <Route exact path="/foods" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/profile" component={ Profile } />
        </MyRecipesProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
