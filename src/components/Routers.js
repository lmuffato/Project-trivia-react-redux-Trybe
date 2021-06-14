import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Login from '../pages/Login';

export default function Routers() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
