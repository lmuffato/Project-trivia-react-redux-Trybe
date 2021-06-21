import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectCustom from './SelectStyled';

class Select extends Component {
  render() {
    const { name, dataTestId, handleChange, classIcon, options } = this.props;
    return (
      <SelectCustom>
        <i className={ `${classIcon}` } />
        <select
          id={ name }
          name={ name }
          onFocus={ this.handleFocus }
          onBlur={ this.handleFocus }
          onChange={ handleChange }
          aria-label={ name }
          required
          data-testid={ dataTestId }
        >
          {options.map((option) => {
            console.log(option);
            return <option key={ option }>{option}</option>;
          })}
        </select>
      </SelectCustom>
    );
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  classIcon: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Select.defaultProps = {
  dataTestId: '',
  classIcon: '',
};

export default Select;
