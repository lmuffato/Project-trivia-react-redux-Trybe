import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      buttonEnable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  checkInputs() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (name && email) {
      this.setState({ buttonEnable: false });
    } else {
      this.setState({ buttonEnable: true });
    }
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
    this.checkInputs();
  }

  render() {
    const { email, name, buttonEnable } = this.state;
    return (
      <>
        <form>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              name="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ buttonEnable }
          >
            Jogar
          </button>
        </form>
        <Link to="/Settings" data-testid="btn-settings">Settings</Link>
      </>
    );
  }
}
