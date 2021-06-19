import React, { Component } from 'react';
import UserData from '../components/UserData';
import GameQuestions from '../components/GameQuestions';

class GameScreen extends Component {
  render() {
    return (
      <div>
        <UserData />
        <GameQuestions />
      </div>
    );
  }
}

export default GameScreen;
