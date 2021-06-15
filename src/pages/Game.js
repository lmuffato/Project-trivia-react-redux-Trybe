import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <section>
        <h1>Trivia Game!</h1>
        <h3 data-testid="question-category">CATEGORIA</h3>
        <h4 data-testid="question-category">QUESTIONS</h4>
        <button
          type="button"
          data-testid={ answer }
          key={ index }
        >
          {answer}
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.game.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
