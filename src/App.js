import React from 'react';
import { Route } from 'react-router';
import './App.css';
import Login from './Pages/Login';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/feedback">
        <Feedback />
      </Route>
      <Route exact path="/ranking">
        <Ranking />
      </Route>
    </div>
  );
}
