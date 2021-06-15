import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import { getQuestion, getToken } from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

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
    const { requestToken, history, requestQuestions } = this.props;
    await requestToken();
    const { token } = this.props;
    history.push('/game');
    localStorage.setItem('token', token);
    requestQuestions(token);
  }

  render() {
    const { name, email } = this.state;
    const regex = /^\w+([.-_]?\w+)*@\w+([.-_]?\w+)*(\.\w{2,3})+$/;
    const nameLength = 0;
    return (
      <form onSubmit={ this.handleSubmit }>
        <div>
          <div>
            <label htmlFor="input-gravatar-email">
              Email:
              <input
                id="input-gravatar-email"
                name="email"
                onChange={ this.handleInput }
                value={ email }
                data-testid="input-gravatar-email"
                autoComplete="off"
              />
            </label>
          </div>
          <label htmlFor="input-player-name">
            Name:
            <input
              id="input-player-name"
              name="name"
              onChange={ this.handleInput }
              value={ name }
              data-testid="input-player-name"
              autoComplete="off"
            />
          </label>
        </div>
        <input
          type="submit"
          value="Play"
          data-testid="btn-play"
          disabled={ !email.match(regex) || name.length <= nameLength }
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.gameData.token,
});

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(getToken()),
  requestQuestions: (token) => dispatch(getQuestion(token)),
});

LoginForm.propTypes = {
  token: string,
  requestToken: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
