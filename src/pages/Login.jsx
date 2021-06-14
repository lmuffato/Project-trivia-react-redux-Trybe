import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
  }

  render() {
    const { email, name } = this.state;
    return (
      <form>
        <label htmlFor="input-player-name">
          Nome:
          <input
            name="name"
            type="text"
            value={ name }
            data-testid="input-player-name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
        </label>
        <br />
        <br />
        <label htmlFor="input-gravatar-email">
          E-mail:
          <input
            name="email"
            type="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
        </label>
        <br />
        <br />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ (name === '' || email === '') }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
