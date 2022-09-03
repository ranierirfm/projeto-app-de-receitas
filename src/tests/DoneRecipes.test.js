import { screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Canvas head: done recipes', () => {

  it('tests if all buttons are on the screen', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/done-recipes')

    const all = screen.getByRole('button', { name: /all/i })
    const foodButton = screen.getByRole('button', { name: /food/i })
    const drinkButton = screen.getByRole('button', { name: /drink/i })

    expect(all).toBeDefined();
    expect(foodButton).toBeDefined();
    expect(drinkButton).toBeDefined();
  })

  it('test the filter buttons', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/done-recipes')

    const all = screen.getByRole('button', { name: /all/i })
    const foodButton = screen.getByRole('button', { name: /food/i })
    const drinkButton = screen.getByRole('button', { name: /drink/i })

    userEvent.click(all)
    userEvent.click(foodButton)
    userEvent.click(drinkButton)
    userEvent.click(all)
  })
  it('Testing share Button', async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () => {},
      },
    });
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/done-recipes')

    const shareButton = await screen.findAllByRole("button", { name: /share icon/i })[0];
    // userEvent.click(shareButton);
  })

  // it('test the filter buttons', () => {
  //   const { history } = renderWithRouterAndRedux(<App />);

  //   history.push('/done-recipes')

  //   const share = screen.getByTestId('0-horizontal-share-btn')
  //   document.execCommand = jest.fn();
    
  //   userEvent.click(share)

  //   const copied = screen.getByText(/link copied!/i)
  //   expect(document.execCommand).toHaveBeenCalledWith("copy");
  // })
})