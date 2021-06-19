import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

import { getTokenThunk, loginAction } from '../redux/actions';

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
    this.setState({ [name]: value }, this.checkInputs());
  }

  handleClick() {
    const { getToken, token } = this.props;
    if (token === null) {
      getToken();
    }
    const { state: { name, email }, props: { loginProps, history } } = this;

    loginProps({ name, email });

    const img = `https://www.gravatar.com/avatar/${md5(email).toString()}`;

    const player = {
      name, email, score: 0, assertions: 0, img };

    localStorage.setItem('state', JSON.stringify({ player }));
    history.push('/game');
  }

  render() {
    const { email, name, buttonEnable } = this.state;
    const { handleClick, handleChange } = this;
    return (
      <>
        <form>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              name="name"
              data-testid="input-player-name"
              onChange={ handleChange }
              value={ name }
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ handleChange }
              value={ email }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ buttonEnable }
            onClick={ handleClick }
          >
            Jogar
          </button>
        </form>
        <Link to="/Settings" data-testid="btn-settings">Settings</Link>
      </>
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
  token: PropTypes.string,
  loginProps: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Login.defaultProps = {
  token: null,
};
