import React from 'react';
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import {createMemoryHistory} from 'history'
import MyRecipesProvider from '../../context/recipesContext/MyRecipesProvider';

function renderWithRouter(component) {
  const history = createMemoryHistory()

  const returnRender = render(
    <Router history={history}>
      <MyRecipesProvider>
        {component}
      </MyRecipesProvider>
    </Router>
  )

  return {history, ...returnRender}
}

export default renderWithRouter;