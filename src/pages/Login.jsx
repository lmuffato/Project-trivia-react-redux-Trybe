import React, { Component } from 'react';
import PropTypes from 'prop-types';
import triviaToken from '../services/apiFetch';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  hasValid(field) {
    return field !== '';
    /* const MIN_LENGTH = 0
    const {email, username} = this.state;
    const validUsername = username.length > MIN_LENGTH
    const validEmail = email.length > MIN_LENGTH
    this.setState({isDisabled: !(validUserName && validEmail)})
    */
  }

  handleChange(event) {
    const { target: { id, value } } = event;
    this.setState({ [id]: value },
      () => {
        const { username, email } = this.state;
        this.setState({ isDisabled: !(this.hasValid(username) && this.hasValid(email)) });
      });
  }

  handleClick() {
    const { history } = this.props;
    triviaToken();
    history.push('/jogo');
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="input-player-name">
          Nome do usuário:
          <input
            id="username"
            onChange={ this.handleChange }
            type="text"
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            id="email"
            onChange={ this.handleChange }
            type="email"
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          disabled={ isDisabled }
          type="submit"
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;
export default Login;
