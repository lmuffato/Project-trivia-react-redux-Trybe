import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputCustom from './InputStyled';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };

    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus() {
    this.setState(({ isFocused }) => ({
      isFocused: !isFocused,
    }));
  }

  render() {
    const { name, type, dataTestId, handleChange, classIcon } = this.props;
    const { isFocused } = this.state;

    return (
      <InputCustom isFocused={ isFocused }>
        <i className={ `${classIcon}` } />
        <input
          name={ name }
          onFocus={ this.handleFocus }
          onBlur={ this.handleFocus }
          onChange={ handleChange }
          type={ type }
          placeholder={ name }
          aria-label={ name }
          required
          data-testid={ dataTestId }
          autoComplete="off"
        />
      </InputCustom>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  dataTestId: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  classIcon: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  dataTestId: '',
  classIcon: '',
};

export default Input;
