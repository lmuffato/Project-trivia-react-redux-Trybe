import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkAPI as ThunkAPIActionCreator } from '../REDUX/Actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      disabled: true,
      nameValid: false,
      emailValid: false,
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges(event, key) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });

    const validated = event.target.checkValidity();
    if (validated === true) {
      (this.setState({ [key]: true }));
    }
    // const { name: nome, email } = this.state;
    // const { action } = this.props;
    // console.log(nome);
    // action(nome, email);

    const { emailValid, nameValid } = this.state;
    if (nameValid && emailValid) {
      return (this.setState({ disabled: false }));
    } return (this.setState({
      disabled: true,
    }));
  }

  render() {
    const { name, email, disabled } = this.state;
    const { ThunkAPI } = this.props;
    return (
      <form>
        <label htmlFor="nomeInput">
          Nome
          <input
            data-testid="input-player-name"
            id="nomeInput"
            type="text"
            name="name"
            onChange={ (event) => this.handleChanges(event, 'nameValid') }
            value={ name }
            pattern=".{1,}"
            required
          />
        </label>

        <label htmlFor="emailInput">
          Email
          <input
            data-testid="input-gravatar-email"
            id="emailInput"
            type="email"
            name="email"
            onChange={ (event) => this.handleChanges(event, 'emailValid') }
            value={ email }
            pattern="(\w\.?)+@[\w\.-]+\.\w{2}"
            required
          />
        </label>

        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ () => (ThunkAPI(name, email)) }
          >
            JOGAR!
          </button>
        </Link>
        <Link to="/config">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ThunkAPI: (name, email) => dispatch(
    ThunkAPIActionCreator(name, email),
  ),
  // action: (name, email) => dispatch(actionLogin(name, email)),
});

Login.propTypes = {
  ThunkAPI: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
