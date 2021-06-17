import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles.css';

class Questions extends Component {
  constructor() {
    super();

    // this.renderQuestions = this.renderQuestions.bind(this);
    this.answerClick = this.answerClick.bind(this);
    this.state = {
      index: 0,
      chosedQuestion: false
    };
  }

  answerClick(event) {
    const { index, chosedQuestion } = this.state
    const { questions } = this.props;
    if (event.target.value === questions[index].correct_answer) {
      // Correct Event
      this.setState({
        index: 1,
        chosedQuestion: true,
      })
      console.log(chosedQuestion);
    } else {
      this.setState({
        index: 1,
        chosedQuestion: true,
      })
    }
  }

  render() {
    const { questions, loading } = this.props;
    const { index, chosedQuestion } = this.state;
    return (
      <div>
        {loading === true ? <p>carregando...</p>
          : <div>
            <p data-testid="question-category">{questions[index].category}</p>
            <p>{questions[index].difficulty}</p>
            <p data-testid="question-text">{questions[index].question}</p>
            <button
              type="button"
              data-testid="correct-answer"
              onClick={this.answerClick}
              value={questions[index].correct_answer}
              className={ chosedQuestion ? 'correct' : null }
              disabled={ chosedQuestion }
            >
              {questions[index].correct_answer}
            </button>
            {questions[index].incorrect_answers
              .map((ia, i) => (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                  key={ i }
                  onClick={this.answerClick}
                  value={ia}
                  className={ chosedQuestion ? 'incorrect' : null }
                  disabled={ chosedQuestion }
                >
                  {ia}
                </button>
              ))}
          </div>}
      </div>
    );
  }
}

// Pensar em uma forma de aleatorizar as respostas.

const mapStateToProps = (state) => ({
  questions: state.questions.questions.results,
  loading: state.questions.loading,
});

export default connect(mapStateToProps, null)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(Object),
  loading: PropTypes.bool.isRequired,
};

Questions.defaultProps = {
  questions: [],
};
