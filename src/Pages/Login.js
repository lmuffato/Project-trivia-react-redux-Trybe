import React from 'react';
import { Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestToken } from '../Api';
import { login } from '../actions';
import './login.css';

const history = createBrowserHistory();

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      redirect: false,
      theToken: null,
      settings: false,
    };
    // bind da função handleChange
    this.handleChange = this.handleChange.bind(this);
    this.setIsDisabled = this.setIsDisabled.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.setTokenLocalStorage = this.setTokenLocalStorage.bind(this);
    this.createInputs = this.createInputs.bind(this);
    this.handleClickSettings = this.handleClickSettings.bind(this);
  }

  // Requisito 2 - função responsavel por salvar no localStorage o token
  setTokenLocalStorage() {
    const { theToken } = this.state;
    if (theToken !== null) {
      localStorage.setItem('token', JSON.stringify(theToken));
    }
  }

  // captura as informações do jogador atraves do input e atribui ao estado local

  // defini se o botão estará habilitado ou não
  setIsDisabled() {
    const { email, name } = this.state;
    const referenceEmail = /\S+@\S+\.\S+/;
    const validEmail = referenceEmail.test(email);
    if (validEmail && name !== '') {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleChange(event) {
    // captura o name e o value dos inputs
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.setIsDisabled();
    });
  }

  handleClickSettings() {
    this.setState({
      settings: true,
    });
  }

  // Requisito 2 - Redirenciona para pagina de games e faz a requisição do token na api;
  async handleClickPlay() {
    const { name: userName, email } = this.state;
    const name = userName;
    const { getLogin } = this.props;
    const localStorageFormat = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(localStorageFormat));
    getLogin({ userName, email });
    const getToken = await requestToken();
    // https://pt.stackoverflow.com/questions/369892/como-redirecionar-para-uma-rota-usando-onclick-e-react-router
    this.setState({
      redirect: true,
      theToken: getToken.token,
    }, () => { this.setTokenLocalStorage(); });
  }

  // Requisito 1 - Criar os inputs de forma dinamica
  createInputs(n, f, dt, st) {
    return (
      <label htmlFor={ n }>
        { f }
        <input
          className={ n }
          data-testid={ dt }
          name={ n }
          onChange={ this.handleChange }
          type="text"
          value={ st }
        />
      </label>
    );
  }

  // Requisito 1 - Implementação da página de login
  render() {
    const { name, email, isDisabled, redirect, settings } = this.state;
    if (redirect && email !== '') {
      history.push('/game');
      return (<Redirect to="/game" />);
    }
    if (settings) {
      history.push('/settings');
      return <Redirect to="/settings" />;
    }
    return (
      <form className="form-login">
        {this.createInputs('name', 'Nome do jogador:', 'input-player-name', name)}
        { this.createInputs('email', 'Email', 'input-gravatar-email', email)}
        <button
          className="btn-play"
          type="button"
          disabled={ isDisabled }
          data-testid="btn-play"
          onClick={ this.handleClickPlay }
        >
          Jogar
        </button>
        {/* Requisito 3 - Botão que redireciona para tela de configuração */}
        <button
          className="btn-settings"
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClickSettings }
        >
          Configurar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
// salva no state global o nome e email do jogador
  getLogin: (state) => dispatch(login(state)),
});

Login.propTypes = {
  getLogin: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
