import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Game from './pages/Game';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

import './global.css';

export default function App() {
  return (
    <Switch>
      <div
        <Route path="/game" component={ Game } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
      </div>
    </Switch>
  );
}
