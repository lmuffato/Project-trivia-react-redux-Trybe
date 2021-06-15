import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import login from '../actions';

// Link do código do regex: https://regexr.com/2ri2c

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.validation = this.validation.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submit(event) {
    event.preventDefault();
    const { name, email } = this.state;
    const { toLogin } = this.props;
    const payload = { name, email };
    toLogin(payload);
  }

  validation() {
    const { name, email } = this.state;
    // Link do código do regex: https://regexr.com/2ri2c
    const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    const nameLength = 3;
    return !(name.length >= nameLength && email.match(pattern));
  }

  render() {
    return (
      <>
        <form onSubmit={ this.submit }>
          <input
            onChange={ this.handleChange }
            aria-label="name"
            data-testid="input-player-name"
            type="text"
            placeholder="Your Name"
            name="name"
            required
          />
          <input
            onChange={ this.handleChange }
            aria-label="email"
            data-testid="input-gravatar-email"
            type="email"
            placeholder="Your E-mail"
            name="email"
            required
          />
          <button
            disabled={ this.validation() }
            type="submit"
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
        <form action="/settings">
          <button
            type="submit"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toLogin: (payload) => dispatch(login(payload)),
});

Login.propTypes = {
  toLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

/* const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginAction(e)),
});
export default connect(null, mapDispatchToProps)(Login); */
