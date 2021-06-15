import React from 'react';

class Game extends React.Component {
  render() {
    return (
      <section>
        <h1>Trivia Game!</h1>
        <h3 data-testid="question-category">CATEGORIA</h3>
        <h4 data-testid="question-category">QUESTIONS</h4>
      </section>
    );
  }
}

export default Game;
