import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testing SearchBar component', () => {
  test('Testing if all elements are presents on the foods page', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />)
    history.push('/foods');

    const searchIcon = screen.getByRole("button", { name: /search/i });
    userEvent.click(searchIcon);
    const searchBar = screen.getByRole("textbox");
    userEvent.type(searchBar, 'Chicken');
    const ingredientRadio = screen.getByRole("radio", { name: /ingredient/i });
    const nameRadio = screen.getByRole("radio", { name: /name/i });
    const firstLetterRadio = screen.getByRole("radio", { name: /first letter/i });
    const searchButton = screen.getAllByRole("button", { name: /search/i })[1];
    
    expect(searchButton).toBeDisabled();

    userEvent.click(ingredientRadio);

    expect(searchButton).not.toBeDisabled();

    userEvent.click(searchButton);
    const chickenRecipe = await screen.findByText("Brown Stew Chicken");

    expect(chickenRecipe).toBeDefined();
    
    userEvent.type(searchBar, 'G');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton)
    const garidesRecipe = await screen.findByText("Garides Saganaki");

    expect(garidesRecipe).toBeDefined()

    userEvent.type(searchBar, 't');
    userEvent.click(nameRadio);
    userEvent.click(searchButton)
    const kumpirRecipe = await screen.findByText("Poutine");

    expect(kumpirRecipe).toBeDefined();

    userEvent.type(searchBar, 'GG');
    userEvent.click(firstLetterRadio)
    userEvent.click(searchButton)

    await waitFor(() => {
      expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
      })
    
  })

  test('Testing if all elements are presents on the drinks page', async () =>{
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />)
    history.push('/drinks');

    const searchIcon = screen.getByRole("button", { name: /search/i });
    userEvent.click(searchIcon);
    const searchBar = screen.getByRole("textbox");
    userEvent.type(searchBar, 'Gin');
    const ingredientRadio = screen.getByRole("radio", { name: /ingredient/i });
    const nameRadio = screen.getByRole("radio", { name: /name/i });
    const firstLetterRadio = screen.getByRole("radio", { name: /first letter/i });
    const searchButton = screen.getAllByRole("button", { name: /search/i })[1];
    
    expect(searchButton).toBeDisabled();

    userEvent.click(ingredientRadio);

    expect(searchButton).not.toBeDisabled();

    userEvent.click(searchButton);
    const longIslandRecipe = await screen.findByText("3-Mile Long Island Iced Tea");

    expect(longIslandRecipe).toBeDefined();

    userEvent.type(searchBar, 'gg');
    userEvent.click(nameRadio);
    userEvent.click(searchButton)
    const eggCreamRecipe = await screen.findByText("Egg Cream");

    expect(eggCreamRecipe).toBeDefined();

    userEvent.type(searchBar, 'f');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton)
    const froseRecipe = await screen.findByText("Frosé");

    expect(froseRecipe).toBeDefined()

    userEvent.type(searchBar, 'GG');
    userEvent.click(firstLetterRadio)
    userEvent.click(searchButton)

    await waitFor(() => {
      expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
      })

  })
  test('Testing if message alert appears on the food screen', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />)
    history.push('/foods');

    const searchIcon = screen.getByRole("button", { name: /search/i });
    userEvent.click(searchIcon);
    const searchBar = screen.getByRole("textbox");
    userEvent.type(searchBar, 'aaaasasaaaa');
    const ingredientRadio = screen.getByRole("radio", { name: /ingredient/i });
    const nameRadio = screen.getByRole("radio", { name: /name/i });
    const firstLetterRadio = screen.getByRole("radio", { name: /first letter/i });
    const searchButton = screen.getAllByRole("button", { name: /search/i })[1];

    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.alert).toBeCalledWith("Sorry, we haven't found any recipes for these filters.");
      })

    userEvent.type(searchBar, 'aaaaaaa');
    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    
    await waitFor(() => {
      expect(global.alert).toBeCalledWith("Sorry, we haven't found any recipes for these filters.");
      })
  })
  test('Testing if message alert appears on the drinks screen', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />)
    history.push('/drinks');

    const searchIcon = screen.getByRole("button", { name: /search/i });
    userEvent.click(searchIcon);
    const searchBar = screen.getByRole("textbox");
    userEvent.type(searchBar, 'aaaasasaaaa');
    const ingredientRadio = screen.getByRole("radio", { name: /ingredient/i });
    const nameRadio = screen.getByRole("radio", { name: /name/i });
    const firstLetterRadio = screen.getByRole("radio", { name: /first letter/i });
    const searchButton = screen.getAllByRole("button", { name: /search/i })[1];

    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.alert).toBeCalledWith("Sorry, we haven't found any recipes for these filters.");
      })

    userEvent.type(searchBar, 'aaaaaaa');
    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    
    await waitFor(() => {
      expect(global.alert).toBeCalledWith("Sorry, we haven't found any recipes for these filters.");
      })
  })
})