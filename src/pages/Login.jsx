import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleEmail = (evt) => (
    setEmail(evt.target.value)
  );

  const handleName = (evt) => (
    setName(evt.target.value)
  );

  return (
    <div>
      <form>
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
      </form>
    </div>
  );
}
