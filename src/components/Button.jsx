import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, dataTestid, className, onClick }) {
  return (
    <button
      type="button"
      data-testid={ dataTestid }
      className={ className }
      onClick={ onClick }
    >
      { children }
    </button>
  );
}

Button.defaultProps = {
  dataTestid: '',
  className: '',
  onClick: () => {},
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  dataTestid: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
