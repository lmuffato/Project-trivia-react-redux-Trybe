import React, { Component } from 'react';

import userValidation from '../utils/functions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { user, email } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="user">
            User:
            <input
              onChange={ this.handleChange }
              data-testid="input-player-name"
              value={ user }
              type="text"
              name="user"
              id="user"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              value={ email }
              type="email"
              name="email"
              id="email"
            />
          </label>
          <button
            disabled={ userValidation(this.state) }
            data-testid="btn-play"
            type="button"
          >
            Jogar
          </button>
        </form>
      </section>
    );
  }
}

export default Login;
