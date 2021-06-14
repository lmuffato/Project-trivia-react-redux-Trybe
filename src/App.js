import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Trivia from './pages/Trivia';
import Ranking from './pages/Ranking';
import store from './store';

export default function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/trivia" component={ Trivia } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
