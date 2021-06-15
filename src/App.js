import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

import Login from './pages/Login';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route component={ NotFound } />
    </Switch>
  );
}
