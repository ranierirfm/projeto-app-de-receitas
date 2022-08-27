import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import MyRecipesProvider from './context/recipesContext/MyRecipesProvider';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <MyRecipesProvider>
        <App />
      </MyRecipesProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
