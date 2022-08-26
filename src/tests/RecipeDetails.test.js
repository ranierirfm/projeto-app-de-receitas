import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testindo Recipe Details page', () => {
  test('Testing if all elements are present on the screen in the food page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/foods/52977'] });

    const imageRecipe = await screen.findByRole("img", { name: /product recipe/i });
    const titleRecipe = await screen.findByRole("heading", { name: /corba/i });
    const categoryRecipe = await screen.findByText("Side");
    const ingredientsRecipe = await screen.findAllByRole("listitem");

    expect(ingredientsRecipe).toHaveLength(13);

    const descriptionRecipe = await screen
      .findByText(/Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside/i);
    const videoRecipe = await screen.findByTestId('video');
    const recomendationRecipe = await screen.findAllByRole("img", { name: /recomendation recipe/i });

    expect(recomendationRecipe).toHaveLength(6);

    const startRecipeButton = await screen.findByRole("button", { name: /start recipe/i });

  })
  test('Testing if all elements are present on the screen in the drink page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997'] });

    const imageRecipe = await screen.findByRole("img", { name: /product recipe/i });
    const titleRecipe = await screen.findByRole("heading", { name: /gg/i });
    const categoryRecipe = await screen.findByRole("heading", { name: /gg/i });
    const ingredientsRecipe = await screen.findAllByRole("listitem");

    expect(ingredientsRecipe).toHaveLength(3);

    const descriptionRecipe = await screen.findByText(/Pour the Galliano liqueur over ice/i);
    const recomendationRecipe = await screen.findAllByRole("img", { name: /recomendation recipe/i });

    expect(recomendationRecipe).toHaveLength(6);

    const startRecipeButton = await screen.findByRole("button", { name: /start recipe/i });

  })
})