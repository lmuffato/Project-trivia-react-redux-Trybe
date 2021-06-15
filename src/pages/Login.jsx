import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../services/api';

import userEmail from '../redux/actions/userEmail.action';
import userLogin from '../redux/actions/userLogin.action';

function Login({ emailDispatch, userDispatch }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleEmail = (evt) => (
    setEmail(evt.target.value)
  );

  const handleName = (evt) => (
    setName(evt.target.value)
  );

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const sessionToken = await fetchToken();
    localStorage.setItem('token', sessionToken.token);
    setRedirect(true);
    emailDispatch(email);
    userDispatch(name);
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          value={ email }
          onChange={ handleEmail }
          data-testid="input-gravatar-email"
        />
        <input
          type="text"
          value={ name }
          onChange={ handleName }
          data-testid="input-player-name"
        />
        <button
          disabled={ email.length === 0 || name.length === 0 }
          type="submit"
          data-testid="btn-play"
        >
          Jogar
        </button>
        <Link data-testid="btn-settings" to="/Settings">Configurações</Link>
        {redirect ? <Redirect to="/game" /> : null}
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (email) => dispatch(userEmail(email)),
  userDispatch: (user) => dispatch(userLogin(user)),
});

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
  userDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
