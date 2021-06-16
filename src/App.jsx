import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Questions from './pages/Questions';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/questions" component={ Questions } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/settings" component={ Settings } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
