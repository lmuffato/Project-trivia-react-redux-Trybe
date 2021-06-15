import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { loginAction } from '../actions';
import * as api from '../services/datasApi';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      loggedIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  validateLogin(nome, email) {
    const re = /[^@]+@[^.]+\..+/g;
    const emailTest = re.test(String(email).toLocaleLowerCase());
    const usernameTest = nome.length > 0;
    return (emailTest && usernameTest);
  }

  handleClick() {
    const { saveLogin } = this.props;
    api.fetchToken().then(({ token }) => localStorage
      .setItem('token', JSON.stringify(token)));
    this.setState({ loggedIn: true });
    saveLogin(this.state);
  }

  render() {
    const { nome, email, loggedIn } = this.state;
    const isDisabled = !this.validateLogin(nome, email);
    return (
      <div>
        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
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
          {loggedIn ? <Redirect to="/game" />
            : (
              <button
                type="button"
                onClick={ this.handleClick }
                disabled={ isDisabled }
                data-testid="btn-play"
              >
                Jogar
              </button>)}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (state) => dispatch(loginAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  saveLogin: PropTypes.func,
}.isRequired;
