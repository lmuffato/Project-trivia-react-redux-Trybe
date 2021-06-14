import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
    </div>
  );
}
