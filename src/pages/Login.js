import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import Settings from '../components/Settings';
import {
  getToken,
  getQuestion,
  getPlayer,
} from '../actions/index';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.validInput = this.validInput.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
      validation: true,
    };
  }

  handleClick() {
    const { tokenRequest, dispatchPlayer, history } = this.props;
    const { name, email } = this.state;
    const player = {
      name,
      gravatarEmail: email,
      score: 0,
      assertions: 0,
    };
    dispatchPlayer(player);
    tokenRequest(() => {
      const { token, questionRequest } = this.props;
      localStorage.setItem('token', token);
      localStorage.setItem('state', JSON.stringify({ player }));
      questionRequest(token);
    });
    history.push('/game');
  }

  validInput() {
    const { email, name } = this.state;
    const re = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    this.setState({
      validation: !(re.test(email) && name.length > 1),
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState(
      {
        [name]: value,
      },
      () => this.validInput(),
    );
  }

  render() {
    const { name, email, validation } = this.state;
    const { categories } = this.props;
    console.log(this.props);

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
          onClick={ () => this.handleClick() }
          data-testid="btn-play"
          disabled={ validation }
        >
          Jogar
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  token: string,
  tokenRequest: func,
}.isRequired;

const mapStateToProps = (state) => ({
  token: state.game.token,
});

const mapDispatchToProps = (dispatch) => ({
  tokenRequest: (callback) => dispatch(getToken(callback)),
  dispatchPlayer: (player) => dispatch(getPlayer(player)),
  questionRequest: (token) => dispatch(getQuestion(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
