import React from 'react';
import '../style/Login/login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndName = this.validateEmailAndName.bind(this);
    this.handleGlobalStates = this.handleGlobalStates.bind(this);
  }

  componentDidMount() {
    this.validateEmailAndName();
  }

  validateEmailAndName() {
    const { email, name } = this.state;
    const four = 4;
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const result = re.test(String(email).toLowerCase());
    if (result && name.length >= four) return false;
    return true;
  }

  handleChange({ target: { value, name } }) {
    this.setState(({ [name]: value }));
  }

  async handleGlobalStates() {
    const { token, history } = this.props;
    await token();
    history.push('/game');
  }

  render() {
    const { email, name } = this.state;
    return (
      <div className="loginFix">
        <div className="loginFather">
          <form>
            <label htmlFor="nome">
              <input
                className="input"
                type="text"
                id="nome"
                data-testid="input-player-name"
                placeholder="Nome"
                value={ name }
                onChange={ this.handleChange }
                name="name"
              />
            </label>
            <label htmlFor="email">
              <input
                className="input"
                type="email"
                id="email"
                data-testid="input-gravatar-email"
                placeholder="Email"
                value={ email }
                onChange={ this.handleChange }
                name="email"
              />
            </label>
            <button
              type="button"
              className="btn btn-primary"
              data-testid="btn-play"
              disabled={ this.validateEmailAndName() }
              onClick={ this.handleGlobalStates }
            >
              Jogar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  token: (id) => dispatch(fetchToken(id)),
});

Login.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default connect(mapDispatchToProps)(Login);
