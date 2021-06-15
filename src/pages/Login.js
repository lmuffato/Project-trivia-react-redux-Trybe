import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUserAction } from '../redux/action';
import { setLocalStorage } from '../helper';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      toggleBtn: true,
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleButtonPlay = this.toggleButtonPlay.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
  }

  setButton() {
    this.setState({
      toggleBtn: this.toggleButtonPlay(),
    });
  }

  toggleButtonPlay() {
    const { email, name } = this.state;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    return !(regexEmail.test(email) && name.length);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, this.setButton);
  }

  async fetchToken() {
    const { email, name } = this.state;
    const { onSubmit } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    console.log(data);
    // localStorage.setItem('token', data.token);
    setLocalStorage('token', data.token); // função auxiliar que faz a mesma coisa que a linha acima.
    onSubmit({ email, name });
    return data;
  }

  render() {
    const { email, name, toggleBtn, shouldRedirect } = this.state;
    const { onSubmit } = this.props;
    if (shouldRedirect) return <Redirect to="/trivia" />;
    return (
      <form onSubmit={ onSubmit }>
        <label htmlFor="email-input">
          Email:
          <input
            id="email-input"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="name-input">
          Nome:
          <input
            id="name-input"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.fetchToken }
          disabled={ toggleBtn }
        >
          JOGAR
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

/* const mapStateToProps = (state) => ({

}); */

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (value) => dispatch(loginUserAction(value)),
});

export default connect(null, mapDispatchToProps)(Login);
