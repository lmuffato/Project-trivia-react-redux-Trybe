import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getToken, addPlayer } from '../actions';
import BtnConfig from './ButtonConfig';
import '../styles/login.css';
import logoLogin from '../trivia.png';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getGravatarPicture = this.getGravatarPicture.bind(this);

    this.state = {
      gravatarEmail: '',
      name: '',
    };
  }

  getGravatarPicture(gravatarEmail) {
    const cryptoEmail = md5(gravatarEmail).toString();
    const picture = `https://www.gravatar.com/avatar/${cryptoEmail}`;
    return picture;
  }

  handleInput({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { gravatarEmail, name } = this.state;
    const { requestToken, history, storePlayerInfo } = this.props;
    await requestToken(this.state);
    const picture = this.getGravatarPicture();
    storePlayerInfo({ gravatarEmail, name, picture });
    history.push('/game');
  }

  labelEmail(gravatarEmail) {
    return (
      <label htmlFor="input-gravatar-email">
        <span>
          <strong>
            Email
          </strong>
        </span>
        <input
          id="input-gravatar-email"
          name="gravatarEmail"
          onChange={ this.handleInput }
          value={ gravatarEmail }
          data-testid="input-gravatar-email"
          autoComplete="off"
        />
      </label>
    );
  }

  labelName(name) {
    return (
      <label htmlFor="input-player-name">
        <span>
          <strong>
            Name
          </strong>
        </span>
        <input
          id="input-player-name"
          name="name"
          onChange={ this.handleInput }
          value={ name }
          data-testid="input-player-name"
          autoComplete="off"
        />
      </label>
    );
  }

  labelBtn(regex, name, nameLength, gravatarEmail) {
    return (
      <input
        type="submit"
        value="Play"
        data-testid="btn-play"
        className={
          gravatarEmail.match(regex) && name.length > nameLength ? 'btnPlay' : ''
        }
        disabled={ !gravatarEmail.match(regex) || name.length <= nameLength }
      />
    );
  }

  render() {
    const { name, gravatarEmail } = this.state;
    const { history } = this.props;
    const regex = /^\w+([.-_]?\w+)*@\w+([.-_]?\w+)*(\.\w{2,3})+$/;
    const nameLength = 0;
    return (
      <div className="elements-content">
        <div className="img-content">
          <img src={ logoLogin } alt="logo-login" />
        </div>
        <form onSubmit={ this.handleSubmit } className="form-content">
          <div className="inputs-content">
            { this.labelEmail(gravatarEmail) }
            { this.labelName(name) }
          </div>
          <div className="btn-content">
            { this.labelBtn(regex, name, nameLength, gravatarEmail) }
            <BtnConfig history={ history } />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.gameData.token,
});

const mapDispatchToProps = (dispatch) => ({
  requestToken: (data) => dispatch(getToken(data)),
  storePlayerInfo: (data) => dispatch(addPlayer(data)),
});

LoginForm.propTypes = {
  token: string,
  requestToken: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
