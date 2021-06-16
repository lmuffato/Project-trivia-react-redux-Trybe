import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { login } from '../actions';
import getToken from '../services/api';

// Link do código do regex: https://regexr.com/2ri2c

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.validation = this.validation.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submit(event) {
    event.preventDefault();
    const { name, email } = this.state;
    const { toLogin } = this.props;
    toLogin(name, email);
    this.setState({ redirect: true });
    this.saveToken();
  }

  saveToken() {
    getToken().then((response) => {
      localStorage.setItem('token', response.token);
    });
  }

  validation() {
    const { name, email } = this.state;
    // Link do código do regex: https://regexr.com/2ri2c
    const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    const nameLength = 3;
    return !(name.length >= nameLength && email.match(pattern));
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/questions" />;
    }

    return (
      <>
        <form onSubmit={ this.submit }>
          <input
            onChange={ this.handleChange }
            s
            aria-label="name"
            data-testid="input-player-name"
            type="text"
            placeholder="Your Name"
            name="name"
            required
          />
          <input
            onChange={ this.handleChange }
            aria-label="email"
            data-testid="input-gravatar-email"
            type="email"
            placeholder="Your E-mail"
            name="email"
            required
          />
          <button
            disabled={ this.validation() }
            type="submit"
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
        <form action="/settings">
          <button
            type="submit"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </form>
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
