import React from 'react';
import { useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';

export default function Header() {
  const { email, name, score } = useSelector((state) => state.loginReducer.player);
  const hash = md5(email);
  const gravatar = `https://www.gravatar.com/avatar/${hash}`;

  return (
    <div>
      <img
        alt="gravatar"
        src={ gravatar }
        data-testid="header-profile-picture"
      />
      <p
        data-testid="header-player-name"
      >
        { name }
      </p>
      <p
        data-testid="header-score"
      >
        { score }
      </p>
    </div>
  );
}
