import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';


describe('Testando a página de Login', () => {
it('Verfica se os elementos são renderizados', () => {  
    renderWithRouter(<App />);
    screen.logTestingPlaygroundURL();
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const submitButton = screen.getByRole('button', { name: /enter/i });
 
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(submitButton).toBeDefined();
    expect(submitButton).toBeDisabled();
} )
it('Verifica se é possível digitar nos campos dos inputs e clicar no botão', () => {
  renderWithRouter(<App />);
  const emailInput = screen.getByRole('textbox');
  const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
  const submitButton = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, 'tryber@trybe.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(submitButton);
})

  it('Verifica se ocorre a troca de página', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
  });
})