import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import GameScreen from './pages/GameScreen';
import Login from './pages/Login';
import RankingScreen from './pages/RankingScreen';
import SetupScreen from './pages/SetupScreen';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/gamescreen" component={ GameScreen } />
      <Route path="/setupscreen" component={ SetupScreen } />
      <Route path="/rankingscreen" component={ RankingScreen } />
    </Switch>
  );
}
