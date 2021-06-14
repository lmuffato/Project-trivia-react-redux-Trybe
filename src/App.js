import React from 'react';
import './App.css';
import Login from './pages/login';
import Game from './pages/game';
import Config from './pages/config'
import Feedback from './pages/feedback';
import { Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/game" component={Game} />
      <Route path="/config" component={Config} />
      <Route path="/feedback" component={Feedback} />
    </Switch>
  );
}
