import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { getQuestions } from '../services/triviaAPI';
import PropTypes from 'prop-types';
import { getAPIThunk, user } from '../redux/actions/actions';

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
    const { getLoginDispatch } = this.props;
    const { state } = this;
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
            onClick={ () => getLoginDispatch({ state }) }
          >
            Jogar
          </button>
        </Link>
        <Link to="/configuracoes">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = { getLoginDispatch: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({
  getLogin: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAPI: (payload) => dispatch(getAPIThunk(payload)),
  getLoginDispatch: (payload) => dispatch(user(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
