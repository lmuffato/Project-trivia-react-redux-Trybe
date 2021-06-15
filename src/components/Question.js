import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Question extends Component {
  render() {
    const { idQuestion, questions } = this.props;
    let alternatives = [];
    if (questions[idQuestion].type !== 'boolean') {
      alternatives = [
        ...questions[idQuestion].incorrect_answers,
        questions[idQuestion].correct_answer,
      ];
    }
    return (
      <div>
        <div data-testid="question-category">
          { `Categoria: ${questions[idQuestion].category}` }
        </div>
        <div data-testid="question-text">
          <p>
            { `Question ${idQuestion + 1}: ${questions[idQuestion].question}` }
          </p>
        </div>
        <div>
          { alternatives
            .map((alt, i) => (
              <button
                type="button"
                key={ i }
                data-testid={
                  questions[idQuestion].incorrect_answers
                    .includes(alt) ? `wrong-answer-${i}` : 'correct-answer'
                }
              >
                { alt }
              </button>
            )) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions.results,
});

Question.propTypes = {
  idQuestion: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Question);
