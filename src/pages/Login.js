import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { getApiToken } from '../services/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      formErrors: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => { this.handleErrors(); });
  }

  handleErrors() {
    const { email, name } = this.state;
    const errorCases = [
      !name,
      !email.match(/^\w+@\w+.com$/),
    ];
    const formComplete = errorCases.every((error) => error !== true);
    this.setState({
      formErrors: !formComplete,
    });
  }

  render() {
    const { formErrors } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form className="form">
          <div>
            <input
              data-testid="input-player-name"
              type="text"
              onChange={ this.handleChange }
              placeholder="Insert name"
              name="name"
            />
            <input
              data-testid="input-gravatar-email"
              type="email"
              onChange={ this.handleChange }
              placeholder="Insert email"
              name="email"
            />
          </div>
          <div>
            <Link to="/game">
              <button
                data-testid="btn-play"
                type="button"
                disabled={ formErrors }
                onClick={ getApiToken }
              >
                Jogar
              </button>
            </Link>
          </div>
        </form>
        <div className="btn-settings">
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configuração
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
