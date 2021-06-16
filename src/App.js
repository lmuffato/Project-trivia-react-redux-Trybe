import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import GamePlay from './pages/GamePlay';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/gameplay" component={ GamePlay } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
