import React from 'react';
import PropTypes from 'prop-types';

function ButtonNext(props) {
  const { onClick, disableBtn } = props;
  console.log(onClick);
  return (
    <div>
      <button
        id="btn-next"
        type="button"
        onClick={ onClick }
        disabled={ disableBtn }
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
