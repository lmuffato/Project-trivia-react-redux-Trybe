import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import Game from './pages/Game';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ!
        </p>
      </header>
      <Switch>
        <Route path="/Game" component={ Game } />
      </Switch>
    </div>
  );
}
