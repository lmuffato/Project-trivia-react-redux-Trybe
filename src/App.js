import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Music from './components/Sounds/Music';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
      </Switch>
      <Music />
    </div>
  );
}
