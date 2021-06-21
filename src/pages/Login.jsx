import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { login } from '../actions';
import { getToken } from '../services/api';
import trivia from '../trivia.png';
import Input from '../components/input/Input';
import { PATTERN_EMAIL, NAME_LENGTH } from '../const/validation';
import Button from '../components/button/Button';

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
      <section className="container login-container">
        <Button
          type="button"
          classIcon="bi bi-gear"
          handleClick={ this.handleRedirect }
          dataTestId="btn-settings"
          classList="button-outline-secondary"
          isRounded
          key="settings"
        />
        <form onSubmit={ this.submit }>
          <img src={ trivia } alt="logo trivia" className="trivia-logo" />
          <Input
            name="name"
            type="text"
            dataTestId="input-player-name"
            handleChange={ this.handleChange }
            classIcon="bi bi-person-circle"
          />
          <Input
            name="email"
            type="email"
            dataTestId="input-gravatar-email"
            handleChange={ this.handleChange }
            classIcon="bi bi-envelope"
          />
          <Button
            text="Jogar"
            type="submit"
            dataTestId="btn-play"
            disabled={ this.validation() }
            classList="button-primary"
            key="Jogar"
          />
        </form>
      </section>
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
