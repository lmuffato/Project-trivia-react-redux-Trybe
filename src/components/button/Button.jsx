import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCustom from './ButtonStyled';

class Button extends Component {
  getSubmit() {
    const { text, dataTestId, handleClick, disabled, classIcon, key, id } = this.props;
    const classListFinal = this.isRounded();
    return (
      <ButtonCustom
        key={ key }
        id={ id }
        className={ classListFinal }
        onClick={ handleClick }
        type="submit"
        data-testid={ dataTestId }
        disabled={ disabled }
      >
        { text }
        <i className={ `${classIcon}` } />
      </ButtonCustom>
    );
  }

  getButton() {
    const { text, dataTestId, handleClick, disabled, classIcon, key, id } = this.props;
    const classListFinal = this.isRounded();
    return (
      <ButtonCustom
        key={ key }
        id={ id }
        className={ classListFinal }
        onClick={ handleClick }
        type="button"
        data-testid={ dataTestId }
        disabled={ disabled }
      >
        { text }
        <i className={ `${classIcon}` } />
      </ButtonCustom>
    );
  }

  isRounded() {
    const { isRounded, classList } = this.props;
    if (isRounded) {
      return classList.concat(' rounded');
    }
    return classList;
  }

  render() {
    const { type } = this.props;
    return type === 'submit' ? this.getSubmit() : this.getButton();
  }
}

Button.propTypes = {
  id: PropTypes.string,
  key: PropTypes.string.isRequired,
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  handleClick: PropTypes.func,
  classIcon: PropTypes.string,
  disabled: PropTypes.string,
  classList: PropTypes.string.isRequired,
  isRounded: PropTypes.bool,
};

Button.defaultProps = {
  id: '',
  text: '',
  classIcon: '',
  dataTestId: '',
  handleClick: () => {},
  disabled: false,
  isRounded: false,
};

export default Button;
