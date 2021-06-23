import React, { Component } from 'react';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.updateScore = this.updateScore.bind(this);
    this.state = {
      score: 0,
    };
  }

  updateScore(newScore) {
    const { score } = this.state;
    this.setState({ score: score + newScore });
  }

  render() {
    const { score } = this.state;
    const { history } = this.props;

    return (
      <div>
        <Header score={ score } />
        <Questions history={history} updateScore={ this.updateScore } />
      </div>
    );
  }
}

export default Game;
