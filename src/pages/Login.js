import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getTokenThunk } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
      config: false,
      login: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.openConfig = this.openConfig.bind(this);
    this.gamePage = this.gamePage.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  verifyInputs() {
    const { user, email } = this.state;
    if ((user.length && email.length) < 1) return true;
    return false;
  }

  openConfig() {
    this.setState({ config: true });
  }

  gamePage() {
    const { user, email } = this.state;
    const { tokenFunc } = this.props;
    this.setState({ login: true });
    tokenFunc({ user, email });
  }

  render() {
    const { config, login } = this.state;
    return (
      <div>
        <input
          name="user"
          type="text"
          data-testid="input-player-name"
          placeholder="Nome"
          onChange={ this.handleChange }
        />
        <input
          name="email"
          type="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <br />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.verifyInputs() }
          onClick={ this.gamePage }
        >
          Play!
        </button>
        {login && <Redirect to="/jogo" />}
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.openConfig }
        >
          Configuração
        </button>
        {config && <Redirect to="/configuracao" /> }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenFunc: (value) => dispatch(getTokenThunk(value)),
});

Login.propTypes = {
  tokenFunc: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
