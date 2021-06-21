import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
  render() {
    const { handleChange, handleClick, validation } = this.props;
    return (
      <div className="login-form">
        <label htmlFor="player-name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            id="player-name"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="player-email">
          E-mail:
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            id="player-email"
            onChange={ handleChange }
          />
        </label>
        <button
          type="submit"
          onClick={ handleClick }
          data-testid="btn-play"
          disabled={ validation }
        >
          Jogar
        </button>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleClick: PropTypes.func,
  handleChange: PropTypes.func,
  validation: PropTypes.bool,
}.isRequired;
