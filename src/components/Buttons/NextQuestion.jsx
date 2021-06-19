import React, { Component } from 'react';
import { func } from 'prop-types';

class NextQuestion extends Component {
  render() {
    const { nextQuestion, hidden } = this.props;

    return (
      <button
        type="button"
        hidden={ hidden }
        className="btn-next-quest"
        data-testid="btn-next"
        onClick={ nextQuestion }
      >
        Próxima
      </button>
    );
  }
}

NextQuestion.propTypes = {
  nextQuestion: func,
}.isRequired;

export default NextQuestion;
