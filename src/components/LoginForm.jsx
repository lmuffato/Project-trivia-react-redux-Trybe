import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import { BsGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import showLogo from '../assets/showLogo.png';

export default class LoginForm extends Component {
  render() {
    const { onChange: handleInputChange, handleLogin, disableBtn } = this.props;
    return (
      <form className="form">
        <img src={ showLogo } width="160px" alt="logo" className="logo" />
        <input
          type="text"
          data-testid="input-player-name"
          placeholder="Nome"
          onChange={ handleInputChange }
          name="name"
        />
        <input
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ handleInputChange }
        />
        <Link to="/jogo">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disableBtn }
            onClick={ handleLogin }
          >
            Jogar
          </button>
        </Link>
        <Link to="/configuracoes">
          <BsGearFill
            className="config"
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </BsGearFill>
        </Link>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onChange: func,
  handleLogin: func,
  disableBtn: bool,
}.isRequired;
