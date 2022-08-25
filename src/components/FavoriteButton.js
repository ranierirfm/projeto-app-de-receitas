import React from 'react';

function FavoriteButton() {
  console.log('a');
  return (
    <button
      type="button"
      data-testid="favorite-btn"
    >
      Favoritar
    </button>
  );
}

export default FavoriteButton;
