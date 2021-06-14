import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      disableButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { userName, userEmail } = this.state;
    this.setState({ [name]: value });
    if (userName.length > 0 && userEmail.length > 0) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  }

  render() {
    const { disableButton } = this.state;
    return (
      <form>
        <label htmlFor="name">
          <input
            name="userName"
            id="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            placeholder="Digite o seu nome"
          />
        </label>
        <label htmlFor="email">
          <input
            name="userEmail"
            id="email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            placeholder="Digite o seu email"
          />
        </label>
        <button type="submit" data-testid="btn-play" disabled={ disableButton }>
          Jogar
        </button>
      </form>
    );
  }
}
