import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.css';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import { BsGearFill } from 'react-icons/bs';
import showDoMilhao from '../assets/showDoMilhao.ogg';
import showLogo from '../assets/showLogo.png';
import { user } from '../redux/actions/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };

    this.validaEmail = this.validaEmail.bind(this);
    this.validaNome = this.validaNome.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  validaEmail(email) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.com ?$/i;
    return emailRegex.test(String(email).toLowerCase());
  }

  validaNome(nome) {
    const minLengthName = 1;
    const verdadeiro = true;
    return nome.length >= minLengthName ? verdadeiro : false;
  }

  checkLogin() {
    const { nome, email } = this.state;
    const check = this.validaEmail(email) && this.validaNome(nome);
    return check;
  }

  render() {
    const { getLoginDispatch } = this.props;
    const { state } = this;
    return (
      <div className="form-container">
        <form className="form">
          <img src={ showLogo } width="160px" alt="logo" className="logo" />
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Nome"
            onChange={ (e) => this.setState({ nome: e.target.value }) }
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
          <Link to="/jogo">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !this.checkLogin() }
              onClick={ () => getLoginDispatch({ state }) }
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
        <ReactAudioPlayer src={ showDoMilhao } autoPlay controls className="music" />
      </div>
    );
  }
}

Login.propTypes = { getLoginDispatch: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({
  getLogin: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getLoginDispatch: (payload) => dispatch(user(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
