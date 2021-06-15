import React from 'react';
import { Redirect } from 'react-router';
import requestToken from '../Api';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      redirect: false,
      theToken: null,
    };
    // bind da função handleChange
    this.handleChange = this.handleChange.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setTokenLocalStorage = this.setTokenLocalStorage.bind(this);
  }

  // Requisito 2 - função responsavel por salvar no localStorage o token
  setTokenLocalStorage() {
    const { theToken } = this.state;
    if (theToken !== null) {
      localStorage.setItem('token', JSON.stringify(theToken));
    }
  }

  // captura as informações do jogador atraves do input e atribui ao estado local
  handleChange(event) {
  // captura o name e o value dos inputs
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.isDisabled();
    });
  }

  // defini se o botão estará habilitado ou não
  isDisabled() {
    const { email, name } = this.state;
    if (email !== '' && name !== '') {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  // Requisito 2 - Redirenciona para pagina de games e faz a requisição do token na api;
  async handleClick() {
    const getToken = await requestToken();
    // https://pt.stackoverflow.com/questions/369892/como-redirecionar-para-uma-rota-usando-onclick-e-react-router
    this.setState({
      redirect: true,
      theToken: getToken.token,
    }, () => { this.setTokenLocalStorage(); });
  }

  // Requisito 1 - Implementação da página de login
  render() {
    const { name, email, isDisabled, redirect, theToken } = this.state;
    console.log(theToken);
    if (redirect) {
      return <Redirect to="/game" />;
    }
    return (
      <form className="form-login">
        <label htmlFor="name">
          Nome do jogador:
          <input
            type="text"
            className="name"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            className="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          name="btn-play"
          className="btn-play"
          type="button"
          disabled={ isDisabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
