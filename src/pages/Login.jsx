import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLogin, getToken } from '../redux/actions';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChanges = this.handleChanges.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.handleApi = this.handleApi.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleApi() {
    const { token } = this.props;
    token();
  }

  handleChanges({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  validateLogin() {
    const { name, email } = this.state;
    const minNameLength = 1;
    const validateRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (validateRegex.test(email) && name.length >= minNameLength) {
      return false;
    }
    return true;
  }

  render() {
    const { name, email } = this.state;
    const { login, tokenToSave } = this.props;
    console.log(tokenToSave);
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
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChanges }
            />
          </label>
          <button
            disabled={ this.validateLogin() }
            type="button"
            data-testid="btn-play"
            onClick={ () => login({ name, email }) }
          >
            <Link to="/play" onClick={ this.handleApi }>
              Jogar
            </Link>

          </button>
        </form>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (userInfo) => dispatch(addLogin(userInfo)),
  token: (saveToken) => dispatch(getToken(saveToken)),
});

const mapStateToProps = (state) => ({
  tokenToSave: state.player.token,
});

Login.propTypes = {
  login: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
