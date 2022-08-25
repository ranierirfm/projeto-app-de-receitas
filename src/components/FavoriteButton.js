import React from 'react';

function FavoriteButton() {
  // console.log(props.dataRecipe);
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
