import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testing filter drink buttons',() => {
  test('Testing filter', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks')

    const filterButton = await screen.findByRole("button", { name: /ordinary drink/i });
    userEvent.click(filterButton);
    const drinkFiltered = await screen.findByText("410 Gone");
    userEvent.click(filterButton);
    const drink = await screen.findByText("GG");
  })
})