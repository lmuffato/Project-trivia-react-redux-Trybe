import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import userValidation from '../utils/functions';
import retrieveData from '../utils/api';
import { userGamer } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
      toRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { addUserGamer } = this.props;
    retrieveData();
    addUserGamer(this.state);
    this.setState({
      toRedirect: true,
    });
  }

  render() {
    const { user, email, toRedirect } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="user">
            User:
            <input
              onChange={ this.handleChange }
              data-testid="input-player-name"
              value={ user }
              type="text"
              name="user"
              id="user"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              value={ email }
              type="email"
              name="email"
              id="email"
            />
          </label>
          <button
            disabled={ userValidation(this.state) }
            data-testid="btn-play"
            type="button"
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
        { toRedirect ? <Redirect to="/Game" /> : null }
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUserGamer: (state) => dispatch(userGamer(state)),
});

Login.propTypes = {
  addUserGamer: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
