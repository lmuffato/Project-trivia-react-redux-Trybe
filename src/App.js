import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Configs from './pages/Configs';
import Login from './pages/Login';
import TelaDoJogo from './pages/TelaDoJogo';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/tela-jogo" component={ TelaDoJogo } />
        <Route exact path="/configuracoes" component={ Configs } />
      </Switch>
    );
  }
}

export default App;
