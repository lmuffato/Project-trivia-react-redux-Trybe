import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTokenThunk, handleChangeUser } from '../actions/actionUser';

class Login extends Component {
  render() {
    const { name, email, handleChange, getToken } = this.props;
    const { history } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              name="name"
              data-testid="input-player-name"
              onChange={ handleChange }
              value={ name }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !!(!name || !email) }
            onClick={ async () => {
              await getToken();
              history.push('/game');
            } }
          >
            Jogar
          </button>
          <Link to="/configuration" data-testid="btn-settings">
            Configurações
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: ({
    target: { name, value },
  }) => dispatch(handleChangeUser(name, value)),
  getToken: () => dispatch(getTokenThunk()),
});

Login.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
