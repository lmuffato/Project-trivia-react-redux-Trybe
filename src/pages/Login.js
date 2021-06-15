import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { loginAction } from '../redux/actions';

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
    this.setState({ [name]: value });
    this.checkInputs();
  }

  handleClick() {
    const { state: { name, email }, props: { loginProps } } = this;
    loginProps({ name, email });
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
          <Link
            to="/game"
            type="button"
            data-testid="btn-play"
            disabled={ buttonEnable }
            onClick={ handleClick }
          >
            Jogar
          </Link>
        </form>
        <Link to="/Settings">
          <button type="button" data-testid="btn-settings">Settings</button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginProps: (payload) => dispatch(loginAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  loginProps: PropTypes.func.isRequired,
};
