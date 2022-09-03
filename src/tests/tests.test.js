import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('test', () => {
  test('testing', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({53060: [6, 5, 4, 3, 2, 1]}))
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods/53060');
    const startRecipe = await screen.findByRole("button", { name: /start recipe/i });
    userEvent.click(startRecipe);
    const finishRecipe = await screen.findByRole("button", { name: /finalizar receita/i });
    userEvent.click(finishRecipe);
    const doneRecipes = await screen.findByRole("heading", { name: /done recipes/i });
  })
})