import React, { Component } from 'react';
import { func } from 'prop-types';

class NextQuestion extends Component {
  render() {
    const { nextQuestion, hidden } = this.props;

    return (
      <button
        hidden={ hidden }
        data-testid="btn-next"
        onClick={ nextQuestion }
        type="button"
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
