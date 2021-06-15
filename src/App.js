import React from 'react';
import { Route } from 'react-router-dom';

import Game from './pages/Game';
import Login from './pages/Login';
import Game from './pages/Game';
import logo from './trivia.png';

export default function App() {
  return (
    <div>
      <header>
        <img src={ logo } width="200" alt="logo" />
      </header>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
    </div>
  );
}
