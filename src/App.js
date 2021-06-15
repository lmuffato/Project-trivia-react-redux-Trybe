import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import Game from './pages/Game';
import './App.css';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/trivia" component={ Game } />
      <Route component={ NotFound } />
    </Switch>
  );
}
