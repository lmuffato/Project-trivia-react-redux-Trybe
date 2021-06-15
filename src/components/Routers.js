import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Login from '../pages/Login';
import Game from '../pages/Game';

export default function Routers() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
