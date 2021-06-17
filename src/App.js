import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
// import './App.css';
import Login from './PAGES/Login';
import Config from './PAGES/Config';
import Game from './PAGES/Game';
import Ranking from './PAGES/Ranking';
import Feedback from './PAGES/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/config" component={ Config } />
      <Route exact path="/game" component={ Game } />
      <Route exatc path="/ranking" component={ Ranking } />
      <Route exact path="/feedback" component={ Feedback } />
    </Switch>
  );
}
