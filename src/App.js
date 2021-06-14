import React from 'react';
import { Route } from 'react-router-dom';

import Login from './pages/Login';
import logo from './trivia.png';

export default function App() {
  return (
    <div>
      <header>
        <img src={ logo } width="200" alt="logo" />
      </header>
      <Route path="/" component={ Login } />
    </div>
  );
}
