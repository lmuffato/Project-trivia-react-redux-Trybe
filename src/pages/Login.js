import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendUser } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      userName: '',
      userEmail: '',
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.updateState = this.updateState.bind(this);
    this.dispatchButton = this.dispatchButton.bind(this);
    this.renderLoginInput = this.renderLoginInput.bind(this);
    this.renderEmailInput = this.renderEmailInput.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  handleAuth() {
    const { userEmail, userName } = this.state;
    const regex2Email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const minLenght = 4;
    const authValid = regex2Email.test(userEmail) && userName.length >= minLenght;
    return authValid ? this.setState({ auth: true }) : this.setState({ auth: false });
  }

  updateState(field, event) {
    const { value } = event.target;
    this.setState({ [field]: value });
    this.handleAuth();
  }

  dispatchButton() {
    const { sendDataUser } = this.props;
    const { userEmail, userName } = this.state;
    const userData = { userEmail, userName };
    sendDataUser(userData);
  }

  renderLoginInput() {
    return (
      <label htmlFor="userName">
        Player Name:
        <input
          type="text"
          id="userName"
          placeholder="Your User Name"
          data-testid="input-player-name"
          onChange={ (event) => this.updateState('userName', event) }
        />
      </label>
    );
  }

  renderEmailInput() {
    return (
      <label htmlFor="userEmail">
        Email:
        <input
          type="email"
          id="userEmail"
          placeholder="Your Email From Gravatar"
          data-testid="input-gravatar-email"
          onChange={ (event) => this.updateState('userEmail', event) }
        />
      </label>
    );
  }

  renderButton() {
    const { auth } = this.state;
    return (
      <button
        type="button"
        disabled={ !auth }
        onClick={ this.dispatchButton }
        data-testid="btn-play"
      >
        Entrar
      </button>
    );
  }

  render() {
    return (
      <div>
        { this.renderLoginInput() }
        <br />
        { this.renderEmailInput() }
        <br />
        { this.renderButton() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendDataUser: (data) => dispatch(sendUser(data)),
});

Login.propTypes = {
  sendDataUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
