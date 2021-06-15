import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import GameScreen from './components/GameScreen';

import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ GameScreen } />
      </Switch>
    );
  }
}

export default App;
