import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import { getQuestion, getToken } from '../actions';
import BtnConfig from './ButtonConfig';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      gravatarEmail: '',
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
    await requestToken(this.state);
    const { token } = this.props;
    history.push('/game');
    requestQuestions(token);
    // playerData(;
  }

  render() {
    const { name, gravatarEmail } = this.state;
    const { history } = this.props;
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
                name="gravatarEmail"
                onChange={ this.handleInput }
                value={ gravatarEmail }
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
          disabled={ !gravatarEmail.match(regex) || name.length <= nameLength }
        />
        <BtnConfig history={ history } />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.gameData.token,
});

const mapDispatchToProps = (dispatch) => ({
  requestToken: (data) => dispatch(getToken(data)),
  requestQuestions: (token) => dispatch(getQuestion(token)),
  // playerData: (data) => dispatch(addPlayer(data)),
});

LoginForm.propTypes = {
  token: string,
  requestToken: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
