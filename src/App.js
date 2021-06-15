import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Game, Result, Ranking, Config } from './pages';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/trivia" component={ Game } />
      <Route exact path="/results" component={ Result } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/settings" component={ Config } />
    </Switch>
  );
}
