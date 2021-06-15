import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Game from './Pages/Game';
import Login from './Pages/Login';
import Feedback from './Pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        {/* Atenção: Utilizar SEMPRE essa estrutura de Route */}
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route exact path="/feedback">
          <Feedback />
        </Route>
      </Switch>
    </div>
  );
}
