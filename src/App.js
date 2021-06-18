import React from 'react';
import { Route, Switch } from 'react-router';

import './App.css';

import Login from './pages/Login';
import Settings from './pages/Settings';
import DisplayGame from './pages/DisplayGame/DisplayGame';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/game" component={ DisplayGame } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
