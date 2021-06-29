import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
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
      score: 0,
      assertions: 0,
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

  startGame() {
    const { name, email } = this.state;
    const { loginAction, requestTokenAction, history } = this.props;
    requestTokenAction();
    loginAction(this.state);

    const state = { player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    } };

    const playerStorage = JSON.stringify(state);
    localStorage.setItem('state', playerStorage);
    history.push('/gameplay');
  }

  renderInputs() {
    const { name, email, playButton } = this.state;
    const { history } = this.props;
    return (
      <Form>
        <Form.Group>
          <Form.Label htmlFor="name">
            Name
            <Form.Control
              type="text"
              id="name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </Form.Label>
          <Form.Label htmlFor="name">
            E-mail
            <Form.Control
              type="email"
              id="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </Form.Label>
        </Form.Group>
        <Button
          className="buttons-login-page"
          variant="primary"
          type="button"
          data-testid="btn-play"
          disabled={ !playButton }
          onClick={ this.startGame }
        >
          Jogar
        </Button>
        <Button
          className="buttons-login-page"
          variant="secondary"
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </Button>
      </Form>
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
