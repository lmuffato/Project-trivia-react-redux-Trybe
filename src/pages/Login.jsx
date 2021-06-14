import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { history, userLogin } = this.props;
    const endpoint = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await endpoint.json();
    localStorage.setItem('token', response.token);
    history.push('/game');
    userLogin(this.state);
  }

  render() {
    const { email, name } = this.state;
    return (
      <form>
        <label htmlFor="input-player-name">
          Nome:
          <input
            name="name"
            type="text"
            value={ name }
            data-testid="input-player-name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
        </label>
        <br />
        <br />
        <label htmlFor="input-gravatar-email">
          E-mail:
          <input
            name="email"
            type="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
        </label>
        <br />
        <br />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ (name === '' || email === '') }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (payload) => dispatch(login(payload)),
});

Login.propTypes = {
  userLogin: PropTypes.string,
  history: PropTypes.object,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
