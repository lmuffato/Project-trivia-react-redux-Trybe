import React, { Component } from 'react';
import logo from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.renderLogin = this.renderLogin.bind(this);
  }

  renderLogo() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.renderLogo()}
      </>
    );
  }
}

export default Login;
