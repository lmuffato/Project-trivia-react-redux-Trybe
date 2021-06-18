import React from 'react';
import { Route, Switch } from 'react-router';
import logo from './trivia.png';
import Game from './pages/Game';
import Login from './pages/Login';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={ logo } width="450px" className="App-logo" alt="logo" />
      </div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/config" component={ Config } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
