import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <img src={ logo } className="App-logo" alt="logo" />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/configuracao" component={ Config } />
        <Route path="/jogo" component={ Game } />
      </Switch>
    </div>
  );
}
