import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getQuestionsActionThunk, loginUserAction } from '../redux/action';
import { setLocalStorage } from '../helper';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      toggleBtn: true,
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleButtonPlay = this.toggleButtonPlay.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
  }

  setButton() {
    this.setState({
      toggleBtn: this.toggleButtonPlay(),
    });
  }

  toggleButtonPlay() {
    const { email, name } = this.state;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    return !(regexEmail.test(email) && name.length);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, this.setButton);
  }

  async fetchToken() {
    const { email, name } = this.state;
    const { onSubmit, fetchQuestion, questionSettings } = this.props;

    const user = {
      email,
      name,
    };

    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };

    try {
      // const response = await fetch('https://opentdb.com/api_token.php?command=request');
      // const data = await response.json();
      // setLocalStorage('token', data.token); // função auxiliar que faz a mesma coisa que a linha acima.
      setLocalStorage('state', player);

      onSubmit(user);
      fetchQuestion(questionSettings);

      this.setState({
        shouldRedirect: true,
      });
      // return data;
    } catch (error) {
      // todo: caso o token seja invalido, tratar o erro e buscar um novo token valido
      console.log(error);
    }
  }

  render() {
    const { email, name, toggleBtn, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/trivia" />;
    return (
      <div>
        <header>
          <Link to="/settings" data-testid="btn-settings">Config</Link>
        </header>
        <main>
          <form>
            <label htmlFor="email-input">
              Email:
              <input
                id="email-input"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
              />
            </label>
            <label htmlFor="name-input">
              Nome:
              <input
                id="name-input"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                data-testid="input-player-name"
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.fetchToken }
              disabled={ toggleBtn }
            >
              JOGAR
            </button>
          </form>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  questionSettings: PropTypes.shape({
    amount: PropTypes.number,
    category: PropTypes.string,
    difficulty: PropTypes.string,
    type: PropTypes.string,
    encode: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questionSettings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (payload) => dispatch(loginUserAction(payload)),
  fetchQuestion: (settingsQuestion, token) => (
    dispatch(getQuestionsActionThunk(settingsQuestion, token))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
