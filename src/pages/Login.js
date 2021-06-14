import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../actions';

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
    const { saveLogin } = this.props;
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
        <Link to="/game">
          <button
            type="button"
            onClick={ () => saveLogin(this.state) }
            disabled={ isDisabled }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </Link>
      </form>

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
