import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      user: '',
      isButtonDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  verifyInput() {
    const { email, user } = this.state;
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    const three = 3;

    return user.length >= three && emailRegex.test(email);
  }

  handleChange(event) {
    const { target: { value, name } } = event;
    this.setState({ [name]: value }, () => {
      console.log(value);
      if (this.verifyInput()) {
        this.setState({ isButtonDisabled: false });
      } else {
        this.setState({ isButtonDisabled: true });
      }
    });
  }

  render() {
    const { email, user, isButtonDisabled } = this.state;
    return (
      <div>
        <input
          value={ email }
          name="email"
          type="email"
          data-testid="input-gravatar-email"
          placeholder="email"
          onChange={ this.handleChange }
        />
        <input
          value={ user }
          name="user"
          type="text"
          data-testid="input-player-name"
          placeholder="nome"
          onChange={ this.handleChange }
        />
        <button
          disabled={ isButtonDisabled }
          type="submit"
          data-testid="btn-play"
        >
          LOGIN
        </button>
      </div>
    );
  }
}
