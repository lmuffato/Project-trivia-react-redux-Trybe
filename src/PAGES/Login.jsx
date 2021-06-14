import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
    const emailRegex = /^\w+@\w+.com$/;
    const { email, nome } = this.state;
    const minlength = 1;
    if (emailRegex.test(email) && (nome.length >= minlength)) {
      return (this.setState({ disabled: false }));
    } return (this.setState({
      disabled: true,
    }));
  }

  render() {
    const { name, email, disabled } = this.state;
    return (
      <form>
        <label htmlFor="nomeInput">
          Nome
          <input
            data-testid="input-player-name"
            id="nomeInput"
            type="text"
            name="name"
            onChange={ (event) => this.handleChanges(event) }
            value={ name }
          />
        </label>

        <label htmlFor="emailInput">
          Email
          <input
            data-testid="input-gravatar-email"
            id="emailInput"
            type="email"
            name="email"
            onChange={ (event) => this.handleChanges(event) }
            value={ email }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
        >
          JOGAR!
        </button>

      </form>
    );
  }
}

export default Login;
