import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiTrivia } from '../services/api';
/* import { connect } from 'react-redux'; */
/* import login from '../actions'; */

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.btnCondition = this.btnCondition.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  async sendRequest() {
    const token = await apiTrivia();
    localStorage.token = token;
  }

  btnCondition() {
    const { name, email } = this.state;
    return !(name !== '' && email !== '');
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form>
        <label htmlFor="name-input">
          Nome:
          <input
            data-testid="input-player-name"
            id="name-input"
            name="name"
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email-input">
          E-mail:
          <input
            data-testid="input-gravatar-email"
            id="email-input"
            type="email"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/tela-jogo">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.btnCondition() }
            onClick={ this.sendRequest }
          >
            Jogar
          </button>
        </Link>
        <Link to="/configuracoes">
          <button
            data-testid="btn-settings"
            type="button"
          >
            configs
          </button>
        </Link>
      </form>
    );
  }
}

/* const mapDispatchToProps = {
  sendLogin: (name, email) => login(name, email),
}; */

/* export default connect(null, mapDispatchToProps)(Login); */

export default Login;
