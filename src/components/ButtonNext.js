import React, { Component } from 'react';
import PropTypes from 'prop-types';

function ButtonNext(props) {
  const { onClick, disableBtn } = props;
  console.log(onClick);
  const display = disableBtn ? 'none' : 'block';
  return (
    <div>
      <button
        style={ { display } }
        id="btn-next"
        type="button"
        onClick={ onClick }
        disabled={ disableBtn }
        data-testid="btn-next"
      >
        Próxima
      </button>
    </div>
  );
}

ButtonNext.propTypes = {
  onClick: PropTypes.func.isRequired,
  disableBtn: PropTypes.bool.isRequired,
};

export default ButtonNext;
