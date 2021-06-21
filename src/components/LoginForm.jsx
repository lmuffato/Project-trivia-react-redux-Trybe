import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import { BsGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import showLogo from '../assets/showLogo.png';
import './LoginForm.css';

export default class LoginForm extends Component {
  inputs() {
    const { onChange: handleInputChange } = this.props;
    return (
      <div>
        <div className="label-float">
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Nome"
            onChange={ handleInputChange }
            name="name"
            id="name"
            required
          />
        </div>
        <div className="label-float">
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Email"
            onChange={ handleInputChange }
            id="email"
            required
          />
        </div>
      </div>
    );
  }

  render() {
    const { handleLogin, disableBtn } = this.props;
    return (
      <form className="form">
        <img src={ showLogo } width="160px" alt="logo" className="logo" />
        {this.inputs()}
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
