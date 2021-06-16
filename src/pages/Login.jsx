import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLogin, fetchToken } from '../redux/actions';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChanges = this.handleChanges.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.handleApi = this.handleApi.bind(this);

    this.state = {
      name: '',
      gravatarEmail: '',
    };
  }

  async handleApi() {
    const { token, history } = this.props;
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

  render() {
    const { name, gravatarEmail } = this.state;
    const { login } = this.props;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <label htmlFor="input-player-name">
            Nome
            <input
              type="text"
              name="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChanges }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email
            <input
              type="email"
              name="gravatarEmail"
              value={ gravatarEmail }
              data-testid="input-gravatar-email"
              onChange={ this.handleChanges }
            />
          </label>
          <button
            disabled={ this.validateLogin() }
            type="button"
            data-testid="btn-play"
            onClick={ () => login({ name, gravatarEmail }) }
          >
            <button type="button" onClick={ this.handleApi }>
              Jogar
            </button>
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
        >
          <Link to="/config">Config</Link>
        </button>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (userInfo) => dispatch(addLogin(userInfo)),
  token: () => dispatch(fetchToken()),
});

Login.propTypes = {
  login: PropTypes.func,
  token: PropTypes.func,
  callApiToQuestions: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
