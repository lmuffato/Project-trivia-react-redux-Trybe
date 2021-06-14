import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { newEmail, newToken } from '../actions/index';
import getToken from '../services/dataApi';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disable: true,
      email: '',
      name: '',
      shouldRedirect: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.newEmail = this.newEmail.bind(this);
    this.newName = this.newName.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { email, name } = this.state;
    if (prevState.email !== email || prevState.name !== name) {
      this.validateFields();
    }
  }

  validateFields() {
    const { email, name } = this.state;
    const nameLength = 1;
    const validate = /\S+@\S+\.\S+/;
    const emailValidate = validate.test(email);
    const nameValidate = name.length >= nameLength;
    this.setState({ disable: !(emailValidate && nameValidate) }); // Logica dessa linha desenvolvida com a ajuda de: João Nascimento
  }

  newEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  newName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  async handleClick() {
    const tokenTest = await getToken();
    localStorage.setItem('token', JSON.stringify(tokenTest.token));
    const { email } = this.state;
    const { addEmail, addToken } = this.props;
    addEmail(email);
    addToken(tokenTest);
    this.setState({
      shouldRedirect: true,
    });
  }

  render() {
    const { disable, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/game" />;
    return (
      <form>
        <label htmlFor="email-input">
          <input
            type="email"
            placeholder="Email"
            id="email-input"
            data-testid="input-gravatar-email"
            onChange={ this.newEmail }
          />
        </label>
        <br />
        <label htmlFor="name-input">
          <input
            type="text"
            placeholder="Nome"
            id="name-input"
            data-testid="input-player-name"
            onChange={ this.newName }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ disable }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (payload) => dispatch(newEmail(payload)),
  addToken: (state) => dispatch(newToken(state)),
});

Login.propTypes = {
  addEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
