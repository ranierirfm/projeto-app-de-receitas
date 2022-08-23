import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste a funcionalidade do componente Footer', () => {
 
    test('Se o Footer está presente e funcional na página "Drinks"', () => {
      const { history } = renderWithRouter(<App />);
  
      history.push('/drinks');
  
      const drinkButton = screen.getByTestId('drinks-bottom-btn');
      const foodButton = screen.getByTestId('food-bottom-btn');
  
      expect(drinkButton).toBeDefined();
      expect(foodButton).toBeDefined();

  
      userEvent.click(foodButton);
      expect(history.location.pathname).toBe('/foods');    
    })
  
    test('Se o Footer está presente e funcional na página "Foods"', () => {
        const { history } = renderWithRouter(<App />);
  
        history.push('/foods');
  
        const drinkButton = screen.getByTestId('drinks-bottom-btn');
        const foodButton = screen.getByTestId('food-bottom-btn');
  
        expect(drinkButton).toBeDefined();
        expect(foodButton).toBeDefined();
  
        userEvent.click(drinkButton);
        expect(history.location.pathname).toBe('/drinks');
  
      })
  
    test('Se o Footer está presente e funcional na página "Profile"', () => {
      const { history } = renderWithRouter(<App />);
  
      history.push('/profile');
  
        const drinkButton = screen.getByTestId('drinks-bottom-btn');
        const foodButton = screen.getByTestId('food-bottom-btn');
  
    expect(drinkButton).toBeDefined();
        expect(foodButton).toBeDefined();
  
      userEvent.click(drinkButton);
      expect(history.location.pathname).toBe('/drinks');
    
    })  
    
  });