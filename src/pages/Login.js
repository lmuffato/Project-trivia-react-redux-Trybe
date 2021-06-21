import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import Settings from '../components/Settings';
import {
  getToken,
  getQuestion,
  getPlayer,
  updateUrl as updateUrlAction,
} from '../actions/index';
import LoginForm from '../components/LoginForm';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.validInput = this.validInput.bind(this);
    this.setModalShow = this.setModalShow.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
      validation: true,
      modalShow: false,
    };
  }

  setModalShow() {
    this.setState(({ modalShow }) => ({
      modalShow: !modalShow,
    }));
  }

  async handleClick() {
    const { tokenRequest, dispatchPlayer, history } = this.props;
    const { name, email } = this.state;
    const player = {
      name,
      gravatarEmail: email,
      score: 0,
      assertions: 0,
    };
    dispatchPlayer(player);
    await tokenRequest(() => {
      const { token, questionRequest, updateUrl } = this.props;
      localStorage.setItem('token', token);
      localStorage.setItem('state', JSON.stringify({ player }));
      updateUrl(`&token=${token}`);
      const { url } = this.props;
      console.log(url);
      questionRequest(url);
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
    this.setState(
      {
        [name]: value,
      },
      () => this.validInput(),
    );
  }

  render() {
    const { validation, modalShow } = this.state;

    return (
      <section className="login-page">
        <button
          type="button"
          data-testid="btn-settings"
          className="bi bi-gear-fill login-button-settings"
          aria-label="Configurações"
          onClick={ this.setModalShow }
        />
        <Settings show={ modalShow } onHide={ this.setModalShow } />
        <LoginForm
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          validation={ validation }
        />
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
  url: state.game.url,
});

const mapDispatchToProps = (dispatch) => ({
  tokenRequest: (callback) => dispatch(getToken(callback)),
  dispatchPlayer: (player) => dispatch(getPlayer(player)),
  questionRequest: (url) => dispatch(getQuestion(url)),
  updateUrl: (part) => dispatch(updateUrlAction(part)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
