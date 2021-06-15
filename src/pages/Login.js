import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { loginAction, userNameAction } from '../actions';

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
    localStorage.setItem('token', JSON.stringify(token));
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
    const { email, user,
      shoudlRedirect,
      isButtonDisabled,
    } = this.state;
    if (shoudlRedirect) {
      return <Redirect to="/game" />;
    }

    return (
      <div>
        <input
          value={ email }
          name="email"
          type="email"
          data-testid="input-gravatar-email"
          placeholder="email"
          onChange={ this.handleChange }
        />
        <input
          value={ user }
          name="user"
          type="text"
          data-testid="input-player-name"
          placeholder="nome"
          onChange={ this.handleChange }
        />

        <button
          disabled={ isButtonDisabled }
          type="submit"
          data-testid="btn-play"
          onClick={ (event) => this.setTokenStorage(event) }
        >
          LOGIN
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(loginAction(email)),
  userNameLogin: (user) => dispatch(userNameAction(user)),
});

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  userNameLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
