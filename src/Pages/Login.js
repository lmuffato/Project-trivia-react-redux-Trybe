import React from 'react';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      redirect: false,
      token: 0,
    };
    // bind da função handleChange
    this.handleChange = this.handleChange.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // captura as informações do jogador atraves do input e atribui ao estado local
  handleChange(event) {
  // captura o name e o value dos inputs
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.isDisabled();
    });
  }

  // defini se o botão estará habilitado ou não
  isDisabled() {
    const { email, name } = this.state;
    if (email !== '' && name !== '') {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }
  // Requisito 2 - Redirenciona para pagina de games e faz a requisição do token na api;
  
  // Requisito 1 - Implementação da página de login
  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <form className="form-login">
        <label htmlFor="name">
          Nome do jogador:
          <input
            type="text"
            className="name"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            className="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          name="btn-play"
          className="btn-play"
          type="button"
          disabled={ isDisabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
