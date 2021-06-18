import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import Feedback from './pages/Feedback';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/game" component={ GamePage } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
