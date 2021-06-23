import React from 'react';
import PropTypes from 'prop-types';
import { Link as button } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLogin, fetchToken } from '../redux/actions';
import logo from '../trivia.png';
import configIcon from '../config.png';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChanges = this.handleChanges.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.handleApi = this.handleApi.bind(this);
    this.formLogin = this.formLogin.bind(this);

    this.state = {
      name: '',
      gravatarEmail: '',
    };
  }

  async handleApi() {
    const { token, history, login } = this.props;
    const { name, gravatarEmail } = this.state;
    login({ name, gravatarEmail });
    await token();
    history.push('/play');
  }

  handleChanges({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  validateLogin() {
    const { name, gravatarEmail } = this.state;
    const minNameLength = 1;
    const validateRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (validateRegex.test(gravatarEmail) && name.length >= minNameLength) {
      return false;
    }
    return true;
  }

  formLogin() {
    const { name, gravatarEmail } = this.state;
    return (
      <form className="form-login">
        <label htmlFor="input-player-name" className="label-login">
          Nome
          <br />
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChanges }
            className="input-login"
          />
        </label>
        <label htmlFor="input-gravatar-email" className="label-login">
          Email
          <br />
          <input
            type="email"
            name="gravatarEmail"
            value={ gravatarEmail }
            data-testid="input-gravatar-email"
            onChange={ this.handleChanges }
            className="input-login"
          />
        </label>
        <button
          disabled={ this.validateLogin() }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleApi }
          className="buttons-login"
        >
          Jogar
        </button>
      </form>
    );
  }

  render() {
    const { history } = this.props;
    return (
      <main className="login-container">
        <img src={ logo } className="logo" alt="logo" />
        {this.formLogin()}
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/config') }
          className="buttons-login config-button"
        >
          <img src={ configIcon } alt="config" className="config-icon" />
          Configurações
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (userInfo) => dispatch(addLogin(userInfo)),
  token: (id) => dispatch(fetchToken(id)),
});

const mapStateToProps = (state) => ({
  categoryId: state.config.categoryID,
});

Login.propTypes = {
  login: PropTypes.func,
  token: PropTypes.func,
  callApiToQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
