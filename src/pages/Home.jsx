import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';

export default function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Link to='/login'><button>Jogar</button></Link>
      </header>
    </div>
  );
}