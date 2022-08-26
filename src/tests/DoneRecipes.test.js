import { screen } from "@testing-library/react";
import React from "react";
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";

describe('Canvas head: done recipes', () => {
  it('Tests if all buttons are on the screen', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/done-recipes')

    const all = screen.getByRole('button', { name: /all/i })
    const foodButton = screen.getByRole('button', { name: /food/i })
    const drinkButton = screen.getByRole('button', { name: /drink/i })
  })
})