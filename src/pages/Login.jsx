import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

import { connect } from 'react-redux';
import { func } from 'prop-types';
import { saveStorage } from '../helpers/storage';
import { saveUser } from '../redux/actions/actions';

import LoginForm from '../components/LoginForm';
import showDoMilhao from '../assets/showDoMilhao.ogg';

import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disableBtn: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyName = this.verifyName.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.checkLogin();
    });
  }

  handleLogin() {
    const { name, email } = this.state;
    const { saveUserLogin } = this.props;

    saveUserLogin({ name, email });
    saveStorage('state', JSON.stringify({ player: { score: 0 } }));
  }

  verifyEmail(email) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.com ?$/i;
    return emailRegex.test(String(email).toLowerCase());
  }

  verifyName(name) {
    const minLengthName = 3;
    return name.length >= minLengthName;
  }

  checkLogin() {
    const { name, email } = this.state;
    const check = this.verifyEmail(email) && this.verifyName(name);
    this.setState({ disableBtn: !check });
  }

  render() {
    const { disableBtn } = this.state;
    return (
      <div className="form-container">
        <LoginForm
          onChange={ this.handleInputChange }
          handleLogin={ this.handleLogin }
          disableBtn={ disableBtn }
        />
        <ReactAudioPlayer src={ showDoMilhao } autoPlay controls className="music" />
      </div>
    );
  }
}

Login.propTypes = {
  saveUserLogin: func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveUserLogin: (user) => dispatch(saveUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);
