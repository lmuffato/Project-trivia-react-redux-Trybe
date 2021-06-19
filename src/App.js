import React from 'react';
import logo from './trivia.png';
import './App.css';
import Routes from './components/routes';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <div>
          <Routes />
        </div>
      </header>
    </div>
  );
}
