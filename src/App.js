import React from 'react';
import { Route, Switch } from 'react-router';
import logo from './trivia.png';
import Game from './pages/Game';
import Login from './pages/Login';
// import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
      </Switch>
      <div className="App-header">
        <img src={ logo } width="250px" className="App-logo" alt="logo" />
      </div>
    </div>
  );
}
