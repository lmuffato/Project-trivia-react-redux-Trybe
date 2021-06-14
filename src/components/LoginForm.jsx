import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../actions';

class LoginForm extends Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      name: '',
    };
  }

  handleInput({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { requestToken } = this.props;
    await requestToken();
    const { token } = this.props;
    console.log(token);
  }

  render() {
    const { name, email } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <div>
          <label htmlFor="input-player-name">
            Name:
            <input
              id="input-player-name"
              name="name"
              onChange={ this.handleInput }
              value={ name }
              data-testid="input-player-name"
            />
          </label>
        </div>
        <div>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              id="input-gravatar-email"
              name="email"
              onChange={ this.handleInput }
              value={ email }
              data-testid="input-gravatar-email"
            />
          </label>
        </div>
        <input type="submit" value="Play" data-testid="btn-play" />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.gameData.token,
});

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(getToken()),
});

LoginForm.propTypes = {
  token: string,
  requestToken: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
