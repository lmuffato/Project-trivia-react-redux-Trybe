import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      disabled: true,
      nameValid: false,
      emailValid: false,
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges(event, key) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });

    const validated = event.target.checkValidity();
    if (validated === true) {
      (this.setState({ [key]: true }));
    }
    const { emailValid, nameValid } = this.state;
    if (nameValid && emailValid) {
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
            onChange={ (event) => this.handleChanges(event, 'nameValid') }
            value={ name }
            pattern=".{1,}"
            required
          />
        </label>

        <label htmlFor="emailInput">
          Email
          <input
            data-testid="input-gravatar-email"
            id="emailInput"
            type="email"
            name="email"
            onChange={ (event) => this.handleChanges(event, 'emailValid') }
            value={ email }
            pattern="(\w\.?)+@[\w\.-]+\.\w{2}"
            required
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
