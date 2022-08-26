import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';


describe('Testing Favorite Rrecipes Page', () => {
    test('Testing if have a title and buttons',  () => {
        const { history } = renderWithRouter(<App />);
        history.push('/favorite-recipes')

        const favTitle = screen.getByRole("heading", { name: /Favorite Recipes/i });
        const filterAll = screen.getByRole("button", { name: /All/i });
        const filterFood = screen.getByRole("button", { name: /Food/i });
        const filterDrinks = screen.getByRole("button", { name: /Drinks/i });
        const profileIcon = screen.getByRole('button', { name: /profile icon/i })


        expect(favTitle).toBeInTheDocument();
        expect(filterAll).toBeInTheDocument();
        expect(filterFood).toBeInTheDocument();
        expect(filterDrinks).toBeInTheDocument();

        expect(profileIcon).toHaveAttribute('src');
    })

    // test('Testing if favorite contents are displayed on the screen',  async () => {
    //     const { history } = renderWithRouter(<App />);

    //     const emailInput = screen.getByRole("textbox");
    //     const passwordInput = screen.getByPlaceholderText("Digite sua senha");
        
    //     userEvent.type(emailInput, 'meu@email.com')
    //     userEvent.type(passwordInput, '1234567')
        
    //     const submitButton = screen.getByRole("button", { name: /enter/i });
    //     userEvent.click(submitButton)

    //     const food = await screen.getByTestId('0-card-img');
    //     userEvent.click(food)

    //     const fav = await screen.getByRole("img", { name: /favorite icon/i });
    //     userEvent.click(fav)

    //     history.push('/favorite-recipes');

    //     const foodImg = screen.getByTestId('0-horizontal-image');
    //     const foodTittle = screen.getByTestId('1-horizontal-top-text');


    //     expect(foodImg).toBeDefined();
    //     expect(foodTittle).toBeDefined();


    // })

})


