import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class GamePlay extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
    this.clickOnOption = this.clickOnOption.bind(this);
  }

  clickOnOption() {
    this.setState({
      clicked: true,
    });
  }

  render() {
    const { clicked } = this.state;
    const { questions, time } = this.props;
    return (
      <div>
        <h1 data-testid="question-category">
          Category:
          {
            questions[0].category
          }
        </h1>
        <h2 data-testid="question-text">{ questions[0].question }</h2>
        <button
          onClick={ (event) => this.clickOnOption(event) }
          id="correct-answer"
          type="button"
          data-testid="correct-answer"
          className={ clicked ? 'green-border' : '' }
          disabled={ time === 0 }
        >
          {
            questions[0].correct_answer
          }
        </button>
        {questions[0].incorrect_answers
          .map((incorretAnsewr, index) => (
            <button
              type="button"
              onClick={ (event) => this.clickOnOption(event) }
              id={ `wrong-answer-${index}` }
              className={ clicked ? 'red-border' : '' }
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              disabled={ time === 0 }
            >
              { incorretAnsewr }
            </button>))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  time: state.timerReducer.time,
  questions: state.gameReducer.questions,
});

GamePlay.propTypes = {
  time: propTypes.number.isRequired,
  questions: propTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, null)(GamePlay);
