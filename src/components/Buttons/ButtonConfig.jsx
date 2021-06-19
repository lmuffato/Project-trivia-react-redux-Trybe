import React, { Component } from 'react';
import { object } from 'prop-types';

class BtnConfig extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ this.handleClick }
        className="btnConfig"
      >
        Configurações
      </button>
    );
  }
}

BtnConfig.propTypes = {
  history: object,
}.isRiquered;

export default BtnConfig;
