import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { login } from '../actions';
import { getToken } from '../services/api';

import { PATTERN_EMAIL, NAME_LENGTH } from '../const/validation';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      redirectPlay: false,
      redirectSettings: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.validation = this.validation.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleRedirect() {
    this.setState({ redirectSettings: true });
  }

  validation() {
    const { name, email } = this.state;
    const nameValidation = name.length >= NAME_LENGTH;
    const emailValidation = email.match(PATTERN_EMAIL);
    return !(nameValidation && emailValidation);
  }

  async submit(event) {
    event.preventDefault();
    const { name, email } = this.state;
    const { toLogin } = this.props;

    toLogin(name, email);
    await this.saveToken();

    this.setState({ redirectPlay: true });
  }

  async saveToken() {
    const { token } = await getToken();
    localStorage.setItem('token', token);
  }

  render() {
    const { redirectPlay, redirectSettings } = this.state;

    if (redirectPlay) return <Redirect to="/questions" />;

    if (redirectSettings) return <Redirect to="/settings" />;

    return (
      <>
        <form onSubmit={ this.submit }>
          <input
            name="name"
            onChange={ this.handleChange }
            type="text"
            placeholder="Nome"
            aria-label="name"
            required
            data-testid="input-player-name"
          />
          <input
            name="email"
            onChange={ this.handleChange }
            type="email"
            placeholder="E-mail"
            aria-label="email"
            required
            data-testid="input-gravatar-email"
          />
          <button
            type="submit"
            disabled={ this.validation() }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
        <button
          type="button"
          onClick={ this.handleRedirect }
          data-testid="btn-settings"
        >
          Configurações
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toLogin: (name, email) => dispatch(login(name, email)),
});

Login.propTypes = {
  toLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
