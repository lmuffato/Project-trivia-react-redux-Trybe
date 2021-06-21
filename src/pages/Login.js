import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { loginAction, userNameAction, resetScore } from '../actions';
import trivia from '../trivia.png';
import '../Style/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      user: '',
      isButtonDisabled: true,
      token: '',
      shoudlRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.handleToken();
  }

  async setTokenStorage(event) {
    event.preventDefault();
    const { email, user, token } = this.state;
    const { userLogin, userNameLogin } = this.props;
    localStorage.setItem('token', token);
    userLogin(email);
    userNameLogin(user);
    this.setState({ shoudlRedirect: true });
  }

  async handleToken() {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await request.json();
    const { token } = data;
    this.setState({ token });
  }

  handleChange(event) {
    const { target: { value, name } } = event;
    this.setState({ [name]: value }, () => {
      console.log(value);
      if (this.verifyInput()) {
        this.setState({ isButtonDisabled: false });
      } else {
        this.setState({ isButtonDisabled: true });
      }
    });
  }

  verifyInput() {
    const { email, user } = this.state;
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    const three = 3;

    return user.length >= three && emailRegex.test(email);
  }

  render() {
    const { email, user, shoudlRedirect, isButtonDisabled } = this.state;
    if (shoudlRedirect) {
      return <Redirect to="/game" />;
    }
    return (
      <div>
        <img src={ trivia } alt="trivia" className="App-logo" />
        <div className="login">
          <div className="inputs-login">
            <input
              value={ email }
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              placeholder="EMAIL"
              onChange={ this.handleChange }
            />
            <input
              value={ user }
              name="user"
              type="text"
              data-testid="input-player-name"
              placeholder="NOME"
              onChange={ this.handleChange }
            />
          </div>
          <button
            className="btn"
            disabled={ isButtonDisabled }
            type="submit"
            data-testid="btn-play"
            onClick={ (event) => this.setTokenStorage(event) }
          >
            JOGAR
          </button>
          <Link to="/settings">
            <button
              className="btn"
              type="submit"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(loginAction(email)),
  userNameLogin: (user) => dispatch(userNameAction(user)),
  resetPlayerScore: () => dispatch(resetScore()),
});

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  userNameLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
