import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import TelaDoJogo from './pages/TelaDoJogo';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/tela-jogo" component={ TelaDoJogo } />
      </Switch>
    );
  }
}

export default App;
