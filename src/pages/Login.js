import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const loginValidation = () => {
    const minCaracter = 6;
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValidation.test(email) && password.length > minCaracter) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    loginValidation();
  });

  const handleSubmit = () => {
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/foods');
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'email') {
      return setEmail(value);
    }
    return setPassword(value);
  };
  return (
    <div>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        data-testid="email-input"
        onChange={ handleChange }
        name="email"
        value={ email }
      />
      <input
        type="password"
        placeholder="Digite sua senha"
        name="password"
        onChange={ handleChange }
        data-testid="password-input"
        value={ password }
      />
      <button
        type="button"
        onClick={ handleSubmit }
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter

      </button>
    </div>
  );
}

export default Login;
