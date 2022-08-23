import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";

describe('test header based on req 7-9', () => {

  it('test title foods, profile button, search button  in /foods', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods')

    const title = screen.getByRole('heading', { name: /foods/i })
    const profileIcon = screen.getByRole('button', { name: /profile icon/i })
    const searchIcon = screen.getByRole('button', { name: /search/i })

    expect(title).toBeDefined();
    expect(profileIcon).toBeInTheDocument();
    expect(profileIcon).toHaveAttribute('src');
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveAttribute('src');
  })

  it('test title drinks, profile button, search button  in /drinks', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks')

    const title = screen.getByRole('heading', { name: /drinks/i })
    const profileIcon = screen.getByRole('button', { name: /profile icon/i })
    const searchIcon = screen.getByRole('button', { name: /search/i })

    expect(title).toBeDefined();
    expect(profileIcon).toBeInTheDocument();
    expect(profileIcon).toHaveAttribute('src');
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveAttribute('src');
  })

  const testHearderInPages = (title, path) => {
    const { history } = renderWithRouter(<App />);
    history.push(path)

    const titlePage = screen.getByRole('heading', { name: title })
    const profileIcon = screen.getByRole('button', { name: /profile icon/i })

    expect(titlePage).toBeDefined();
    expect(profileIcon).toBeInTheDocument();
  }

  it('test title profile, profile button in /profile', () => {
    testHearderInPages('Profile', '/profile')
  })

  it('test title done recipes, profile button in /done-recipes', () => {
    testHearderInPages('Done Recipes', 'done-recipes')
  })

  it('test title favorite recipes, profile button in /favorite-recipes', () => {
    testHearderInPages('Favorite Recipes', 'favorite-recipes')
  })

  it('tests if the profile button redirects to the path /profile', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods')

    const title = screen.getByRole('heading', { name: /foods/i })
    const profileIcon = screen.getByRole('button', { name: /profile icon/i })

    expect(title).toBeDefined();
    expect(profileIcon).toBeInTheDocument();

    userEvent.click(profileIcon)

    expect(history.location.pathname).toBe('/profile')

  })

  it('Tests if clicking the search button the search input is rendered', () => {
    const {history} = renderWithRouter(<App />);

    history.push('/foods');

    const searchIcon = screen.getByRole('button', { name: /search/i })
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeDefined();

    userEvent.click(searchIcon)
  })
})