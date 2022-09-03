import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testing filter drink buttons',() => {
  test('Testing filter', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods')

    const filterButton = await screen.findByRole("button", { name: /beef/i });
    userEvent.click(filterButton);
    const drinkFiltered = await screen.findByText("Beef and Mustard Pie");
    userEvent.click(filterButton);
    const drink = await screen.findByText("Corba");
  })
})