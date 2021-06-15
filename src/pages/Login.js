import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FcSettings } from 'react-icons/fc';
import { fetchToken } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
    this.verify = this.verify.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verify());
  }

  verify() {
    const { name, email } = this.state;
    const result = /\w+@\w+\.\w+/gi.test(email);
    const resultName = /\w+/gi.test(name);
    if (result && resultName) {
      this.setState({
        disabled: false,
      });
    } else { this.setState({ disabled: true }); }
  }

  render() {
    const { loginAction } = this.props;
    const { disabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            type="email"
            name="email"
          />
        </label>
        <label htmlFor="name">
          Name:
          <input
            onChange={ this.handleChange }
            data-testid="input-player-name"
            type="text"
            name="name"
          />
        </label>
        <Link to="/game">
          <button
            onClick={ () => loginAction() }
            disabled={ disabled }
            data-testid="btn-play"
            type="button"
          >
            Jogar:
          </button>
          <Link to="/configuracoes">
            <FcSettings
              style={ { fontSize: '1.8em' } }
              type="button"
              data-testid="btn-settings"
            />
          </Link>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginAction: () => dispatch(fetchToken()),
});

Login.propTypes = {
  loginAction: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
