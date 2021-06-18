import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonNext extends Component {
  render() {
    const { onClick, disableBtn } = this.props;
    return (
      <div>
        <button
          disabled={ disableBtn }
          type="button"
          onClick={ onClick }
          data-testid="btn-next"
          id="btn-next"
        >
          Próxima
        </button>
      </div>
    );
  }
}

ButtonNext.propTypes = {
  onClick: PropTypes.func.isRequired,
  disableBtn: PropTypes.bool.isRequired,
};

export default ButtonNext;
