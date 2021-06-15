import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import fetchToken from '../services/api';

export default function Login() {
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
