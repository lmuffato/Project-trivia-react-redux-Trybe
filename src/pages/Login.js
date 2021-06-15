import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.redirect = this.redirect.bind(this);
    this.requestToken = this.requestToken.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isEnabled = this.isEnabled.bind(this);
    this.state = {
      disabled: true,
      name: '',
      email: '',
      redirectNow: false,
    };
  }

  redirect() {
    this.setState((prev) => ({
      ...prev,
      redirectNow: true,
    }));
  }

  async requestToken() {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const responseInJSON = await request.json();
    const { token } = responseInJSON;
    localStorage.setItem('token', token);
    return this.redirect();
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
    const { state: { disabled, redirectNow }, handleChange, requestToken } = this;
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
        </form>
        { redirectNow ? <Redirect to="/Game" /> : null }
      </div>
    );
  }
}

export default Login;
