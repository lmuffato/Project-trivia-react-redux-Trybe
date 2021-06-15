import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLoginAction } from '../actions';
import { getToken } from '../services/triviaApi';
import Tooltip from '../components/buttonSettings';
import '../css/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      disabledButton: true,
      redirect: false,
    };
    this.login = this.login.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { email, name } = this.state;
    if (prevState.email !== email || prevState.name !== name) {
      this.validateInputs();
    }
  }

  validateInputs() {
    const minNameLength = 3;
    const { email, name } = this.state;
    const emailRegex = /\S+@\S+\.\S+/; // *https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/ *//
    const validName = name.length > minNameLength;
    const validEmail = email.match(emailRegex);
    this.setState({ disabledButton: !(validEmail && validName) });
  }

  login(event) {
    event.preventDefault();
    localStorage.setItem('token', getToken());
    this.setState({ redirect: true });
    const { email, name } = this.state;
    const { userLogin } = this.props;
    userLogin({ email, name });
  }

  render() {
    const { email, name, disabledButton, redirect } = this.state;
    if (redirect) return <Redirect to="/trivia" />;
    return (
      <form onSubmit={ this.login }>
        <div className="login">
          <Tooltip />
          <h1>Trybia - Login</h1>
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ (event) => this.setState({ email: event.target.value }) }
            data-testid="input-gravatar-email"
            placeholder="Email"
          />
          <input
            type="text"
            name="name"
            value={ name }
            onChange={ (event) => this.setState({ name: event.target.value }) }
            data-testid="input-player-name"
            placeholder="Nome"
          />
          <button
            disabled={ disabledButton }
            display="none"
            className="btnLogin"
            type="submit"
            data-testid="btn-play"
          >
            Jogar
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (payload) => dispatch(userLoginAction(payload)),
});

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
