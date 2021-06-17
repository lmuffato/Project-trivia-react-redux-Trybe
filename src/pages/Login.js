import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction, getTokenThunk } from '../redux/actions';
import styles from './login.module.css';
import Header from '../components/Login/Header';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      buttonEnable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.title = 'Login';
  }

  checkInputs() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (name && email) {
      this.setState({ buttonEnable: false });
    } else {
      this.setState({ buttonEnable: true });
    }
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
    this.checkInputs();
  }

  handleClick() {
    const { getToken, token } = this.props;
    if (token === null) {
      getToken();
    }
    const { state: { name, email }, props: { loginProps, history } } = this;
    loginProps({ name, email });
    history.push('/game');
  }

  render() {
    const { email, name, buttonEnable } = this.state;
    const { handleClick, handleChange } = this;
    return (
      <main className={ styles.login_container }>
        <Header />
        <div className={ styles.login_title }>
          <h1>Trivia Online</h1>
          <p>Autentique-se utilizando um e-mail do gravatar e jogue agora mesmo!</p>
        </div>

        <div className={ styles.login__form__container }>
          <form className={ styles.login__form }>
            <input
              type="text"
              id="name"
              name="name"
              data-testid="input-player-name"
              onChange={ handleChange }
              value={ name }
              placeholder="Nome"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ handleChange }
              value={ email }
              placeholder="Email do gravatar"
              required
            />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ buttonEnable }
              onClick={ handleClick }
            >
              Jogar
            </button>
          </form>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginProps: (payload) => dispatch(loginAction(payload)),
  getToken: () => dispatch(getTokenThunk()),
});

const mapStateToProps = (state) => ({
  token: state.tokenReducer.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  loginProps: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
