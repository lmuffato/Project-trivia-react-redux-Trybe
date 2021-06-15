import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor(props) {
    super(props);
    const { questions } = this.props;
    this.state = {
      questions,
      count: 0,
    };
  }

  render() {
    const { questions, count } = this.state;
    const { category, question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer } = questions[count];
    console.log(questions[count]);
    console.log(incorrectAnswer);
    const arrayQuestions = [...incorrectAnswer, correctAnswer];
    const sortValue = 0.5;
    const questionsArray = arrayQuestions.sort(() => Math.random() - sortValue);
    console.log(arrayQuestions);
    return (
      <div>
        <div>
          <h3 data-testid="question-category">{category}</h3>
          <p data-testid="question-text">{question}</p>
        </div>
        <div>
          {questionsArray.map((query, index) => {
            if (query === correctAnswer) {
              return (
                <p data-testid="correct-answer" key={ `answer-${index}` }>
                  <button type="button">{ query }</button>
                </p>);
            }
            return (
              <p data-testid={ `wrong-answer-${index}` } key={ `answer-${index}` }>
                <button type="button">{ query }</button>
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameData.questions,
});

Questions.propTypes = {
  questions: arrayOf(object),
}.isRequired;

export default connect(mapStateToProps, null)(Questions);
