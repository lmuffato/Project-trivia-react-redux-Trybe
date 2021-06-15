import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/game" component={ GamePage } />
    </Switch>
  );
}
