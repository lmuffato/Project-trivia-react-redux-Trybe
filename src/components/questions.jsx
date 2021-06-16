import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();

    // this.renderQuestions = this.renderQuestions.bind(this);

    this.state = {
      index: 0,
    };
  }

  render() {
    const { questions, loading } = this.props;
    const { index } = this.state;
    // console.log(questions);
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
            >
              {questions[index].correct_answer}
            </button>
            {questions[index].incorrect_answers
              .map((ia, i) => (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                  key={ i }
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
