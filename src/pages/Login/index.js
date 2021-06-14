import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tokenAPI from '../../services/api';
import './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  async fetchToken() {
    const token = await tokenAPI();
    localStorage.setItem('token', token);
  }

  async handleClick() {
    await this.fetchToken();
  }

  render() {
    const { email, nickname } = this.state;
    const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      <form>
        <label htmlFor="input-nickname">
          Nome:
          <input
            type="text"
            name="nickname"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-email">
          Email:
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            pattern={ patternEmail }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ !((patternEmail.test(email)) && (nickname.length > 0)) }
        >
          Jogar
        </button>
      </form>
    );
  }
}

Login.protoTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
