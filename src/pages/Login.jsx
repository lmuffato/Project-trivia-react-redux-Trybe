import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import fetchToken from '../services/api';
import userEmail from '../redux/actions/userEmail.action';
import userLogin from '../redux/actions/userLogin.action';
import ImgLogo from '../components/LoginComponents/ImgLogo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const sessionToken = await fetchToken();
    localStorage.setItem('token', sessionToken.token);
    setRedirect(true);
    dispatch(userEmail((email)));
    dispatch(userLogin((name)));
  };

  return (
    <div>
      <ImgLogo />
      <form onSubmit={ handleSubmit }>
        <label htmlFor="userEmail">
          Email:
          <input
            id="userEmail"
            type="email"
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="playerName">
          Player:
        <input
          id="playerName"
          type="text"
          value={ name }
          onChange={ (event) => setName(event.target.value) }
          data-testid="input-player-name"
        />
        </label>
        <button
          id='play'
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
