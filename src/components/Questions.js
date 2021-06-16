import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setAttribute from '../services/setAttribute';
import shuffle from '../services/shuffle';
import changeColors from '../services/changeColors';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  }

  checkAnswer() {
    changeColors();
  }

  renderQuestion(results, index) {
    const correctAnswer = [{
      answer: results[index].correct_answer,
      attribute: 'correct-answer',
    }];
    const incorrectAnswers = [...results[index].incorrect_answers];
    const incorrectWAtt = setAttribute(incorrectAnswers);
    const answers = [...correctAnswer, ...incorrectWAtt];
    const randomAnswers = shuffle(answers);
    console.log(randomAnswers);
    return (
      <>
        <h3 data-testid="question-text">{results[index].question}</h3>
        <p data-testid="question-category">
          Category:
          { results[index].category }
        </p>
        <div>Respostas ;</div>
        {randomAnswers.map((elem) => (
          <button
            key={ elem.answer }
            type="button"
            data-testid={ elem.attribute }
            onClick={ this.checkAnswer }
            className="answer"
          >
            {elem.answer}
          </button>))}
      </>
    );
  }

  render() {
    const { index } = this.state;
    const { results } = this.props;
    return (
      <div>
        {results.length !== 0
        && this.renderQuestion(results, index)}
        <button type="button" onClick={ this.handleClick }>Proxima</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.game.perguntas,
});

Question.propTypes = {
  results: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Question);
