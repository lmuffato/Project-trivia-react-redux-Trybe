import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import trivia from '../trivia.png';
import { login, fetchToken } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.startGame = this.startGame.bind(this);

    this.state = {
      name: '',
      email: '',
      playButton: false,
    };
  }

  validateFields() {
    const { name, email } = this.state;
    const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const playButton = name.length > 0 && regex.test(email);
    this.setState({ playButton });
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => this.validateFields());
  }

  async startGame() {
    const { state } = this;
    const { loginAction, requestTokenAction, history } = this.props;
    await requestTokenAction();
    loginAction(state);
    history.push('/gameplay');
  }

  renderInputs() {
    const { name, email, playButton } = this.state;
    const { history } = this.props;
    return (
      <>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          E-mail
          <input
            type="email"
            id="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !playButton }
          onClick={ this.startGame }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </>
    );
  }

  render() {
    return (
      <main className="App">
        <img
          className="App-logo"
          src={ trivia }
          alt="trivia"
        />
        <section>
          {this.renderInputs()}
        </section>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestTokenAction: () => dispatch(fetchToken()),
  loginAction: (state) => dispatch(login(state)),
});

Login.propTypes = {
  loginAction: PropTypes.func,
  requestTokenAction: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
