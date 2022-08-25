import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';

function ShareButton(props) {
  const [isCopied, setIsCopied] = useState(false);

  const copyUrl = () => {
    const { url } = props;
    clipboardCopy(`http://localhost:3000${url}`);
    console.log(`http://localhost:3000${url}`);
    setIsCopied(true);
  };

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyUrl }
      >
        Compartilhar
      </button>
      { isCopied && <p>Link copied!</p> }
    </>

  );
}

ShareButton.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired }),
}.isRequired;

export default ShareButton;
