import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.redirectToConfigsNow = this.redirectToConfigsNow.bind(this);
    this.redirectToGameNow = this.redirectToGameNow.bind(this);
    this.requestToken = this.requestToken.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isEnabled = this.isEnabled.bind(this);
    this.state = {
      disabled: true,
      name: '',
      email: '',
      redirectToGame: false,
      redirectToConfigs: false,
    };
  }

  redirectToConfigsNow() {
    this.setState((prev) => ({
      ...prev,
      redirectToConfigs: true,
    }));
  }

  redirectToGameNow() {
    this.setState((prev) => ({
      ...prev,
      redirectToGame: true,
    }));
  }

  async requestToken() {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const responseInJSON = await request.json();
    const { token } = responseInJSON;
    localStorage.setItem('token', token);
    return this.redirectToGameNow();
  }

  isEnabled() {
    const { state: { name, email } } = this;
    if (name.length > 0 && email.length > 0) {
      this.setState((prev) => ({
        ...prev,
        disabled: false,
      }));
    } else {
      this.setState((prev) => ({
        ...prev,
        disabled: true,
      }));
    }
  }

  handleChange({ target: { id, value } }) {
    this.setState((prev) => ({
      ...prev, [id]: value,
    }), () => this.isEnabled());
  }

  render() {
    const { state: { disabled, redirectToGame, redirectToConfigs },
      handleChange, requestToken, redirectToConfigsNow } = this;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Name:
            <input
              onChange={ handleChange }
              data-testid="input-player-name"
              id="name"
              type="text"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              onChange={ handleChange }
              data-testid="input-gravatar-email"
              id="email"
              type="email"
            />
          </label>
          <button
            onClick={ requestToken }
            disabled={ disabled }
            data-testid="btn-play"
            type="button"
          >
            Jogar
          </button>
          <button
            style={ { marginLeft: '740px' } }
            type="button"
            data-testid="btn-settings"
            onClick={ redirectToConfigsNow }
          >
            configurações
          </button>
        </form>
        { redirectToGame ? <Redirect to="/Game" /> : null }
        { redirectToConfigs ? <Redirect to="/config" /> : null }
      </div>
    );
  }
}

export default Login;
