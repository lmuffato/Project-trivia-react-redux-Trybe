import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };

    this.validaEmail = this.validaEmail.bind(this);
    this.validaNome = this.validaNome.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  validaEmail(email) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.com ?$/i;
    return emailRegex.test(String(email).toLowerCase());
  }

  validaNome(nome) {
    const minLengthName = 1;
    const verdadeiro = true;
    return nome.length >= minLengthName ? verdadeiro : false;
  }

  checkLogin() {
    const { nome, email } = this.state;
    const check = this.validaEmail(email) && this.validaNome(nome);
    return check;
  }

  render() {
    return (
      <form>
        <h1>Página de Login</h1>
        <input
          type="text"
          data-testid="input-player-name"
          placeholder="Nome"
          onChange={ (e) => this.setState({ nome: e.target.value }) }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ (e) => this.setState({ email: e.target.value }) }
        />
        <Link to="/jogo">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !this.checkLogin() }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}

export default Login;
