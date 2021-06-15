import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTokenThunk } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      disableButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { getToken } = this.props;
    getToken();
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { userName, userEmail } = this.state;
    this.setState({ [name]: value });
    if (userName.length > 0 && userEmail.length > 0) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  }

  render() {
    const { disableButton } = this.state;
    return (
      <form>
        <label htmlFor="name">
          <input
            name="userName"
            id="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            placeholder="Digite o seu nome"
          />
        </label>
        <label htmlFor="email">
          <input
            name="userEmail"
            id="email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            placeholder="Digite o seu email"
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disableButton }
            onClick={ this.onClick }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(getTokenThunk()),
});

Login.propTypes = {
  getToken: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
