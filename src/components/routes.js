import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from '../pages/Feedback';
import Game from '../pages/Game';
import Login from '../pages/Login';
import Settings from '../pages/Settings';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default Routes;
