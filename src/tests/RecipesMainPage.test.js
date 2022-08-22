import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { screen } from '@testing-library/react';

describe('Testing foods recipes main page', () => {
  test('Testing if have a title and buttons filters', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods')
    
    const foodTitle = screen.getByRole("heading", { name: /foods/i });
    const searchInput = screen.getByRole("button", { name: /search/i });
    const profileInput = screen.getByRole("button", { name: /profile icon/i });
    const beefFilter = await screen.findByRole("button", { name: /beef/i });
    const breakFastFilter = await screen.findByRole("button", { name: /breakfast/i });
    const chickenFilter = await screen.findByRole("button", { name: /chicken/i });
    const dessertFilter = await screen.findByRole("button", { name: /dessert/i });
    const goatFilter = await screen.findByRole("button", { name: /goat/i });

    expect(foodTitle).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(profileInput).toBeInTheDocument();
    expect(beefFilter).toBeInTheDocument();
    expect(breakFastFilter).toBeInTheDocument();
    expect(chickenFilter).toBeInTheDocument();
    expect(dessertFilter).toBeInTheDocument();
    expect(goatFilter).toBeInTheDocument();
    
    screen.logTestingPlaygroundURL();
  })
  test('Testing if have images cards and your length in food recipes page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods')

    const allImageCards = await screen.findAllByRole("img");

    expect(allImageCards).toHaveLength(12);

    expect(history.location.pathname).toBe('/foods');

  })
})

describe('Testing drinks recipes main page', () => {
  test('Testing if have a title and buttons filters', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks')

    const drinkTitle = screen.getByRole("heading", { name: /drinks/i });
    const searchInput = screen.getByRole("button", { name: /search/i });
    const profileInput = screen.getByRole("button", { name: /profile icon/i });
    const ordinaryDrink = await screen.findByRole("button", { name: /ordinary drink/i });
    const cocktailFilter = await screen.findByRole("button", { name: /cocktail/i });
    const shakeFilter = await screen.findByRole("button", { name: /shake/i });
    const otherUnknownFilter = await screen.findByRole("button", { name: /other\/unknown/i });
    const cocoaFilter = await screen.findByRole("button", { name: /cocoa/i });

    expect(drinkTitle).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(profileInput).toBeInTheDocument();
    expect(ordinaryDrink).toBeInTheDocument();
    expect(cocktailFilter).toBeInTheDocument();
    expect(shakeFilter).toBeInTheDocument();
    expect(otherUnknownFilter).toBeInTheDocument();
    expect(cocoaFilter).toBeInTheDocument();
  })
  test('Testing if have images cards and your length in drink recipes page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks')

    const allImageCards = await screen.findAllByRole("img");

    expect(allImageCards).toHaveLength(12);

    expect(history.location.pathname).toBe('/drinks');

  })
})
