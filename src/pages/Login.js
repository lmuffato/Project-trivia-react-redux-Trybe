import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      email: '',
      playButton: false,
    };
  }

  validateFields() {
    const { name, email } = this.state;
    const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const playButton = name.length > 0 && regex.test(email);
    this.setState({ playButton });
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => this.validateFields());
  }

  render() {
    const { name, email, playButton } = this.state;

    return (
      <div>
        <h1>Tela de login</h1>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          E-mail
          <input
            type="email"
            id="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button type="button" data-testid="btn-play" disabled={ !playButton }>
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
