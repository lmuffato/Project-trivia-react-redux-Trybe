import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import './App.css';
import GameScreen from './pages/GameScreen';

function App() {
  return (
    <Switch>
      <Route exact path="/"><Login /></Route>
      <Route path="/TelaJogo"><GameScreen /></Route>
    </Switch>
  );
}

export default App;
