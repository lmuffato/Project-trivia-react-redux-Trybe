import React from 'react';
// import { login } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  verifyInputs() {
    const { user, email } = this.state;
    if ((user.length && email.length) < 1) return true;
    return false;
  }

  render() {
    return (
      <div>
        <input
          name="user"
          type="text"
          data-testid="input-player-name"
          placeholder="Nome"
          onChange={ this.handleChange }
        />
        <input
          name="email"
          type="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <br />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.verifyInputs() }
        >
          Play!
        </button>
      </div>
    );
  }
}

export default Login;
