import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';

class Alert extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
        <Link to="/">
          <button type="button">Voltar</button>
        </Link>
      </div>
    );
  }
}

Alert.propTypes = {
  children: Proptypes.object,
}.isRequired;

export default Alert;
