import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BadgeCustom from './BadgeStyle';

class Badge extends Component {
  render() {
    const { dataTestId, text, value, classIcon, classList } = this.props;

    return (
      <BadgeCustom className={ classList }>
        <span>
          <i className={ classIcon } />
          {text}
        </span>
        <span data-testid={ dataTestId }>{value}</span>
      </BadgeCustom>
    );
  }
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  classList: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  classIcon: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Badge.defaultProps = {
  dataTestId: '',
  classIcon: '',
};

export default Badge;
