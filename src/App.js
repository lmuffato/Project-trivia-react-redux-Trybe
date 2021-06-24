import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import './App.css';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/setting" component={ Settings } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
