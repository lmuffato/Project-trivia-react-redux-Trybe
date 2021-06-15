import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import userValidation from '../utils/functions';
import retrieveData from '../utils/api';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
      toRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    retrieveData();
    this.setState({
      toRedirect: true,
    });
  }

  render() {
    const { user, email, toRedirect } = this.state;
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
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
        { toRedirect ? <Redirect to="/Game" /> : null }
      </section>
    );
  }
}

export default Login;
