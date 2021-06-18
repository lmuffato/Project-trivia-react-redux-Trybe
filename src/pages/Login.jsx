import React from 'react';
import '../CSS/Login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gifLogin from '../images/gifLogin.gif';
import { login } from '../redux/actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gravatarEmail: '',
      name: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { history, userLogin } = this.props;
    const endpoint = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await endpoint.json();
    localStorage.setItem('token', response.token);
    history.push('/game');
    userLogin(this.state);
  }

  render() {
    const { gravatarEmail, name } = this.state;
    return (
      <fieldset>
        <form>
          <img src={ gifLogin } alt="gif" width="40%" />
          <label htmlFor="input-player-name">
            <input
              placeholder="Nome"
              name="name"
              type="text"
              value={ name }
              data-testid="input-player-name"
              onChange={ (e) => this.setState({ name: e.target.value }) }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            <input
              placeholder="E-mail"
              name="email"
              type="email"
              value={ gravatarEmail }
              data-testid="input-gravatar-email"
              onChange={ (e) => this.setState({ gravatarEmail: e.target.value }) }
            />
          </label>
          <button
            className="btn-play"
            type="button"
            data-testid="btn-play"
            disabled={ (name === '' || gravatarEmail === '') }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <Link to="/configuration">
            <button
              className="btn-config"
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (payload) => dispatch(login(payload)),
});

Login.propTypes = {
  userLogin: PropTypes.string,
  history: PropTypes.object,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
