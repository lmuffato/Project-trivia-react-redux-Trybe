import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
// import './App.css';
import Login from './PAGES/Login';
import Config from './PAGES/Config';
import Game from './PAGES/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/config" component={ Config } />
      <Route exact path="/game" component={ Game } />
      {/*
      <Route exact path="/feedback" component={ Feedback } />
      <Route exatc path="/ranking" component={ Ranking } /> */}
    </Switch>
  );
}
