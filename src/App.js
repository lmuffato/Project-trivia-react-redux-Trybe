import React from 'react';
import { Route } from 'react-router';
import './App.css';
import Login from './Pages/Login';

export default function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Login />
      </Route>
    </div>
  );
}
