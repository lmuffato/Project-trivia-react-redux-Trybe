import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Timer from './components/Timer';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route exact path="/" component={ Login } />
      </Switch>
      <Timer />
    </div>
  );
}
