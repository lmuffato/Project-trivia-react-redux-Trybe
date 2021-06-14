import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
// import './App.css';
import Login from './PAGES/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route exact path="/game" component={ Game } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exatc path="/ranking" component={ Ranking } /> */}
    </Switch>
  );
}
