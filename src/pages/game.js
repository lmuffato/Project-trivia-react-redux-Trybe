import React, { Component } from 'react';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Questions history={history} />
      </div>
    );
  }
}

export default Game;
