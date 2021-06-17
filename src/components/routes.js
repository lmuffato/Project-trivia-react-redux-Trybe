import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Jogo from '../pages/Jogo';
import Configuracoes from '../pages/Configuracoes';
import Feedback from '../pages/Feedback';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/jogo" component={ Jogo } />
        <Route path="/configuracoes" component={ Configuracoes } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default Routes;
