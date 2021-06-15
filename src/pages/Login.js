import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import { getToken, updatePlayer } from '../actions/index';
import Settings from '../components/Settings';

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

  async handleClick() {
    const { tokenRequest, history } = this.props;
    await tokenRequest(() => {
      const { token } = this.props;
      localStorage.setItem('token', token);
      history.push('/game');
    });
  }

  validInput() {
    const { email, name } = this.state;
    const re = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    this.setState({
      validation: !(re.test(email) && name.length > 1),
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      const { update } = this.props;
      const { name: playerName } = this.state;
      const player = { name: playerName };
      localStorage.setItem('player', JSON.stringify(player));
      update(player);
    });
    this.validInput();
  }

  render() {
    const { name, email, validation } = this.state;
    const { token } = this.props;
    console.log(token);

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

const mapStateToProps = (state) => {
  console.log(state);
};

const mapDispatchToProps = (dispatch) => ({
  tokenRequest: (callback) => dispatch(getToken(callback)),
  update: (data) => dispatch(updatePlayer(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
