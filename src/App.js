import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
