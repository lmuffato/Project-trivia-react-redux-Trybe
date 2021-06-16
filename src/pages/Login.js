import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken as getTokenThunk, getUserInfo } from '../actions/index';

// import fetchAPI from '../services/fetchtoken';
// import logo from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };
    // this.renderLogo = this.renderLogo.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // renderLogo() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={ logo } className="App-logo" alt="logo" />
  //         <p>
  //           SUA VEZ
  //         </p>
  //       </header>
  //     </div>
  //   );
  // }

  componentDidUpdate(prevProps, prevState) {
    const { email, name } = this.state;
    if (prevState.email !== email || prevState.name !== name) {
      return this.handleVerifyLogin();
    }
  }

  handleClick() {
    const { sendToken, sendState } = this.props;
    const { name, email } = this.state;
    sendToken();
    sendState({ name, email });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleVerifyLogin() {
    const { email, name } = this.state;
    const re = /\S+@\S+\.\S+/;
    const verifyEmail = re.test(email);
    const nameLength = 1;
    if (name.length >= nameLength && verifyEmail) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  renderLogin() {
    const { isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Digite seu nome:
          <input
            type="text"
            id="name"
            name="name"
            data-testid="input-player-name"
            placeholder="digite seu nome aqui"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="email">
          Digite seu e-mail:
          <input
            type="text"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="exemplo@exemplo.com"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            onClick={ () => this.handleClick() }
            disabled={ isDisabled }
          >
            Jogar
          </button>
        </Link>
        <Link to="/setting">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurar
          </button>
        </Link>
      </form>
    );
  }

  render() {
    return (
      <>
        {/* {this.renderLogo()} */}
        {this.renderLogin()}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.trivia,
});

const mapDispatchToProps = (dispatch) => ({
  sendToken: () => dispatch(getTokenThunk()),
  sendState: (user) => dispatch(getUserInfo(user)),
});

Login.propTypes = {
  sendToken: PropTypes.func,
  sendState: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
