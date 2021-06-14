import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import Configuration from './components/Configuration';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        SUA VEZ
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/configuration" component={ Configuration } />
        </Switch>
      </header>
    </div>
  );
}
