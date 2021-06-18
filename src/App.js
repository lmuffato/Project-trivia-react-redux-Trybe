import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import Game from './pages/Game';
import './App.css';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/trivia" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
      <Route component={ NotFound } />
    </Switch>
  );
}
