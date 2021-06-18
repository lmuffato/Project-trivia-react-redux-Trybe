import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Configs from './pages/Configs';
import Login from './pages/Login';
import TelaDoJogo from './pages/TelaDoJogo';
import Feedback from './pages/Feedback';
import './materializeCss/materialize.css';
import './materializeCss/materialize.min.css';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/tela-jogo" component={ TelaDoJogo } />
        <Route exact path="/configuracoes" component={ Configs } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default App;
