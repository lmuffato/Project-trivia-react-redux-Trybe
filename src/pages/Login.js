import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
    this.validateLogin();
  }

  validateLogin() {
    const { nome, email } = this.state;
    if (nome && email !== '') {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="player-name">
          <input
            id="player-name"
            name="nome"
            type="text"
            onChange={ this.handleChange }
            data-testid="input-player-name"
            placeholder="Digite seu nome"
          />
        </label>
        <label htmlFor="player-email">
          <input
            id="player-email"
            name="email"
            type="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            placeholder="Digite seu e-mail"
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid="btn-play"
        >
          Entrar
        </button>
      </form>

    );
  }
}

export default Login;
