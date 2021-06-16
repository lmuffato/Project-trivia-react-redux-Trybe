import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
 import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Configuration from './pages/Configuration';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/configuration" component={ Configuration } />
      <Route exact path="/feedback" component={ Feedback } />
    </Switch>
  );
}
