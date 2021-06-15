import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import GamePage from './pages/GamePage';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ GamePage } />
    </Switch>
  );
}
