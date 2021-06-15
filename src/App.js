import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/login" component={ Login } />
      <Route component={ NotFound } />
    </Switch>
  );
}
