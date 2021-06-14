import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Jogo from '../pages/Jogo';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/jogo" component={ Jogo } />
      </Switch>
    );
  }
}

export default Routes;
