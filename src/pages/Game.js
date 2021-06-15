import React from 'react';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <section>
        <Header />
        <Questions />
      </section>
    );
  }
}

export default Game;
