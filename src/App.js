import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Recipes from './components/Recipes';
import MyRecipesProvider from './context/recipesContext/MyRecipesProvider';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <MyRecipesProvider>
          <Route exact path="/foods" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
        </MyRecipesProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
