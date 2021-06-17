import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';
import './App.css';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <img src={ logo } className="App-logo" alt="logo" />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/configuracao" component={ Config } />
        <Route path="/jogo" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
