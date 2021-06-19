import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getTokenThunk, resetPlacar } from '../redux/actions';
import frases from '../services/frases';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
      config: false,
      login: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.openConfig = this.openConfig.bind(this);
    this.gamePage = this.gamePage.bind(this);
    this.pegarFrase = this.pegarFrase.bind(this);
  }

  componentDidMount() {
    const { resetPlacarFunc } = this.props;
    for (let i = 0; i < 100; i += 1) {
      window.clearInterval(i);
      window.clearTimeout(i);
    }
    resetPlacarFunc();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  pegarFrase() {
    let randomIndex = 0;
    const maxLength = 6;
    randomIndex = Math.floor(Math.random() * maxLength);
    const randomFrase = frases[randomIndex].frase;
    const randomAutor = frases[randomIndex].autor;
    return (
      <>
        <p className="frase">{`${randomFrase}`}</p>
        <br />
        <p className="autor">{`${randomAutor}`}</p>
      </>
    );
  }

  verifyInputs() {
    const { user, email } = this.state;
    if ((user.length && email.length) < 1) return true;
    return false;
  }

  openConfig() {
    this.setState({ config: true });
  }

  gamePage() {
    const { user, email } = this.state;
    const { tokenFunc } = this.props;
    this.setState({ login: true });
    tokenFunc({ user, email });
    const player = {
      player: {
        name: user,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  inputName() {
    return (
      <input
        name="user"
        id="floatingInput"
        type="text"
        data-testid="input-player-name"
        onChange={ this.handleChange }
        className="form-control"
        placeHolder="Nome:"
        autoComplete="none"
      />
    );
  }

  render() {
    const { config, login } = this.state;
    return (
      <div className="login-container">
        <img src={ logo } className="App-logo" alt="logo" />
        <h3 className="ultra">ULTRA HARD</h3>
        <div className="form-group mb-3">
          {this.inputName()}
          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Email"
            className="form-control"
            onChange={ this.handleChange }
            autoComplete="none"
          />
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.verifyInputs() }
            onClick={ this.gamePage }
            className="btn btn-outline-success btn-play"
          >
            Play!
          </button>
          {login && <Redirect to="/jogo" />}
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.openConfig }
            className="btn btn-outline-secondary btn-config"
          >
            Configuração
          </button>
          {config && <Redirect to="/configuracao" /> }
        </div>
        <div className="names">José - Patrick -  Anderson - Robertson</div>
        {this.pegarFrase()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenFunc: (value) => dispatch(getTokenThunk(value)),
  resetPlacarFunc: () => dispatch(resetPlacar()),
});

Login.propTypes = {
  tokenFunc: PropTypes.func.isRequired,
  resetPlacarFunc: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
