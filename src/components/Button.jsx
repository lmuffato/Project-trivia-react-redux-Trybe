import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, dataTestid, className, onClick, disabled }) {
  return (
    <button
      type="button"
      data-testid={ dataTestid }
      className={ className }
      onClick={ onClick }
      disabled={ disabled }
    >
      { children }
    </button>
  );
}

Button.defaultProps = {
  dataTestid: '',
  className: '',
  disabled: false,
  onClick: () => {},
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  dataTestid: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
