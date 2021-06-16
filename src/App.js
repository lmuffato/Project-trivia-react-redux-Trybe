import React from 'react';
import { Route, Switch } from 'react-router';

import './App.css';

import Login from './pages/Login';
import Settings from './pages/Settings';
import DisplayGame from './pages/DisplayGame/DisplayGame';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/game" component={ DisplayGame } />
    </Switch>
  );
}
