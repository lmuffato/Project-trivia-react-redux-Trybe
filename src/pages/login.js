import React, { Component } from 'react';
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
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isDisabled }
        >
          Jogar
        </button>
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

export default Login;
