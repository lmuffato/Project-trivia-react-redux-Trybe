import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
    };

    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { nome, email } = this.state;
    return (
      <form>
        <label htmlFor="nomeInput">
          Nome
          <input
            data-testid="input-player-name"
            id="nomeInput"
            type="text"
            name="name"
            onChange={ this.handleChanges }
            value={ nome }
          />
        </label>

        <label htmlFor="emailInput">
          Email
          <input
            data-testid="input-gravatar-email"
            id="emailInput"
            type="email"
            name="email"
            onChange={ this.handleChanges }
            value={ email }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
        >
          JOGAR!
        </button>

      </form>
    );
  }
}

export default Login;
