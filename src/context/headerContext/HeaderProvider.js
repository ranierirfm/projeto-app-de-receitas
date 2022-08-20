import React from 'react';
import HeaderContext from './HeaderContext';

function HeaderProvider({ children }) {
  const { Provider } = HeaderContext;

  return (
    <Provider value="">
      { children }
    </Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default HeaderProvider;
