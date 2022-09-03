import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testing Recipe in progress', () => {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => {},
    },
  });
  test('Testing all foods elements', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods/53060/in-progress')

    const imgRecipe = await screen.findAllByRole("img")[0];
    const nameRecipe = await screen.findByText("Burek");
    const favoriteIcon = await screen.findByRole("img", { name: /favorite icon/i });
    userEvent.click(favoriteIcon);
    const shareIcon = await screen.findByRole("img", { name: /share icon/i });
    userEvent.click(shareIcon)
    const typeRecipe = await screen.findByText("Side");
    const ingredientRecipe1 = await screen.findByText("Filo Pastry - 1 Packet");
    userEvent.click(ingredientRecipe1);
    const ingredientRecipe2 = await screen.findByText("Minced Beef - 150g");
    userEvent.click(ingredientRecipe2);
    const ingredientRecipe3 = await screen.findByText("Onion - 150g");
    userEvent.click(ingredientRecipe3);
    const ingredientRecipe4 = await screen.findByText("Oil - 40g");
    userEvent.click(ingredientRecipe4);
    const ingredientRecipe5 = await screen.findByText("Salt - Dash");
    userEvent.click(ingredientRecipe5);
    const ingredientRecipe6 = await screen.findByText("Pepper - Dash");
    userEvent.click(ingredientRecipe6);
    userEvent.click(ingredientRecipe6);
    userEvent.click(ingredientRecipe6);
    const finishButton = await screen.findByRole("button", { name: /finalizar receita/i });
    userEvent.click(finishButton);
    const doneRecipes = await screen.findByRole("heading", { name: /done recipes/i });
  })
  test('Testing all drinks elements', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks/17222/in-progress')

    const imgRecipe = await screen.findAllByRole("img")[0];
    const nameRecipe = await screen.findByText("A1");
    const favoriteIcon = await screen.findByRole("img", { name: /favorite icon/i });
    userEvent.click(favoriteIcon);
    const shareIcon = await screen.findByRole("img", { name: /share icon/i });
    userEvent.click(shareIcon)
    const typeRecipe = await screen.findByText("Cocktail");
    const ingredientRecipe1 = await screen.findByText("Gin - 1 3/4 shot");
    userEvent.click(ingredientRecipe1);
    const ingredientRecipe2 = await screen.findByText("Grand Marnier - 1 Shot");
    userEvent.click(ingredientRecipe2);
    const ingredientRecipe3 = await screen.findByText("Lemon Juice - 1/4 Shot");
    userEvent.click(ingredientRecipe3);
    const ingredientRecipe4 = await screen.findByText("Grenadine - 1/8 Shot");
    userEvent.click(ingredientRecipe4);
    userEvent.click(ingredientRecipe4);
    userEvent.click(ingredientRecipe4);
    const finishButton = await screen.findByRole("button", { name: /finalizar receita/i });
    userEvent.click(finishButton);
    const doneRecipes = await screen.findByRole("heading", { name: /done recipes/i });
  })
  test('test local storage', () => {
    localStorage.clear();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks/17222/in-progress')
  })
})