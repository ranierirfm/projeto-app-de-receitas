import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { getFavoriteStorage, saveFavoriteStorage } from '../services/favoriteStorage';

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: () => {},
  },
});

const favoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot:  'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  }, 
];


describe('Testing Favorite Rrecipes Page', () => {
  test('Testing if have a title and buttons',  () => {
    saveFavoriteStorage(favoriteRecipes);
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes')

    const favTitle = screen.getByRole("heading", { name: /Favorite Recipes/i });
    const profileIcon = screen.getByRole('button', { name: /profile icon/i })

    expect(favTitle).toBeInTheDocument();
    expect(profileIcon).toHaveAttribute('src');
  })

  test('Testing if favorite contents are displayed on the screen',  async () => {
    saveFavoriteStorage(favoriteRecipes);
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes');

    const tittle1 = await screen.findAllByTestId('1-horizontal-top-text');
    const tittle2 = screen.getByTestId('0-horizontal-top-text');
    const foodImg = screen.getByTestId('0-horizontal-image');
    const foodTittle = await screen.findAllByTestId('1-horizontal-top-text');


    expect(foodImg).toBeDefined();
    expect(foodTittle).toBeDefined();
    expect(tittle1).toBeDefined();
    expect(tittle2).toBeDefined();
  })
  test('Testing buttons filter', async () => {
    saveFavoriteStorage(favoriteRecipes);
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes');
    const copyButton = await screen.findAllByRole("img", { name: /share icon/i });
    userEvent.click(copyButton[0]);
    const favoriteButton = await screen.findAllByRole("img", { name: /favorite icon/i });
    userEvent.click(favoriteButton[0]);
  })
  test('Favorites test', async () => {
    saveFavoriteStorage(favoriteRecipes);
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes');
    const allFilter = await screen.findByRole("button", { name: /all/i });
    userEvent.click(allFilter);
    const drinkFilter = await screen.findByRole("button", { name: /drinks/i });
    userEvent.click(drinkFilter);
    const foodFilter = await screen.findByRole("button", { name: /food/i });
    userEvent.click(foodFilter);
  })
  test('Testing empty localStorage', () => {
    const test = getFavoriteStorage();
    localStorage.clear();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes');
  })
})
