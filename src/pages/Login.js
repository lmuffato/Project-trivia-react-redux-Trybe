import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLogin } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChanges = this.handleChanges.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChanges({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <form>
        <label htmlFor="input-player-name">
          Nome
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChanges }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChanges }
          />
        </label>
        <button type="button" data-testid="btn-play">Jogar</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (userInfo) => dispatch(addLogin(userInfo)) });

Login.propTypes = {
  login: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
