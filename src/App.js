import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Login from './pages/Login';
import logo from './trivia.png';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <div>
        <header>
          <img src={ logo } width="200" alt="logo" />
        </header>
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/" component={ Login } />
      </div>
    </Switch>
  );
}
