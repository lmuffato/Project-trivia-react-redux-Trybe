import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { user, questionsApi, getToken } from '../../actions';
import { tokenAPI } from '../../services/api';
import logo from '../../images/trivia.png';
import './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  async fetchToken() {
    const { userToken } = this.props;
    const token = await tokenAPI();
    localStorage.setItem('token', token);

    userToken(token);

    // const questions = await triviaAPI(token);
    // triviaQuestions(questions);
  }

  async handleClick() {
    const { name, email } = this.state;
    const { login, history } = this.props;
    console.log('Clique jogar');

    login({ name, email });
    await this.fetchToken();
    history.push('/game');
  }

  render() {
    const { email, name } = this.state;
    const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
        <form>
          <label htmlFor="input-name">
            Nome:
            <input
              type="text"
              name="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-email">
            Email:
            <input
              type="email"
              name="email"
              data-testid="input-gravatar-email"
              pattern={ patternEmail }
              onChange={ this.handleChange }
            />
          </label>
          {/* <Link to="/game"> */}
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
            disabled={ !((patternEmail.test(email)) && (name.length > 0)) }
          >
            Jogar/
          </button>
          {/* </Link> */}
        </form>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(user(payload)),
  triviaQuestions: (payload) => dispatch(questionsApi(payload)),
  userToken: (payload) => dispatch(getToken(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
