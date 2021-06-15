import React, { Component } from 'react';
import Settings from '../components/Settings';

export default class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.validInput = this.validInput.bind(this);

    this.state = {
      name: '',
      email: '',
      validation: true,
    };
  }

  validInput() {
    const { email, name } = this.state;
    const re = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    this.setState({
      validation: !(re.test(email) && name.length > 1),
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
    this.validInput();
  }

  render() {
    const { name, email, validation } = this.state;

    return (
      <section>
        <button
          type="button"
          data-testid="btn-settings"
          className="bi bi-gear-fill"
          aria-label="Configurações"
        />
        <Settings />
        <label htmlFor="player-name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            id="player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="player-email">
          E-mail:
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            id="player-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          onClick={ this.handleClick }
          data-testid="btn-play"
          disabled={ validation }
        >
          Jogar
        </button>
      </section>
    );
  }
}
