import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Play from './pages/Play';
import Feedback from './pages/Feedback';
import Config from './pages/Config';
import Ranking from './pages/Ranking';
// import { Login, NotFound, Play, Feedback, Config, Ranking } from './pages/';

export default function App() {
  return (
    <Switch>
      <Route exact path="/"><Login /></Route>
      <Route path="/play" component={ Play } />
      <Route path="/config" component={ Config } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
      <Route component={ NotFound } />
    </Switch>
  );
}
