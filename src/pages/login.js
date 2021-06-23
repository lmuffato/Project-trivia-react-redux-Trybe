import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requestAPIthunk from '../actions';
import { emailHash } from '../services/API';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleValidation = this.handleValidation.bind(this);

    this.state = {
      usuario: '',
      email: '',
      disabled: true,
    };
  }

  handleValidation({ target }) {
    const { name, value } = target;
    const { usuario, email } = this.state;
    this.setState({ [name]: value });
    if (usuario !== '' && email !== '') {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { disabled, usuario, email } = this.state;
    const { handleClick } = this.props;
    return (
      <div>
        {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* </header> */}
        <form>
          <label htmlFor="name">
            <input
              type="text"
              data-testid="input-player-name"
              name="usuario"
              id="name"
              onChange={ this.handleValidation }
            />
          </label>
          <label htmlFor="email">
            <input
              type="text"
              data-testid="input-gravatar-email"
              name="email"
              id="email"
              onChange={ this.handleValidation }
            />
          </label>
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ disabled }
              onClick={ () => { handleClick(); emailHash(usuario, email); } }
            >
              Jogar
            </button>
          </Link>
        </form>
        <Link to="/config">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  handleClick: () => dispatch(requestAPIthunk()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
