import React, { Component } from 'react';
import { string, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import Alternative from './Alternative';
import Timer from './Timer';
import { saveStorage } from '../helpers/storage';
import { updateScore } from '../redux/actions/actions';

class Question extends Component {
  constructor(props) {
    super(props);

    this.verifyAnswer = this.verifyAnswer.bind(this);
    this.calcScore = this.calcScore.bind(this);
    this.difficultyConditional = this.difficultyConditional.bind(this);
    this.saveInStorage = this.saveInStorage.bind(this);
  }

  async verifyAnswer({ target }) {
    const { question, updateScoreDispatch } = this.props;
    const { correct_answer: correctAnswer } = question;

    if (target.innerHTML === correctAnswer) {
      await updateScoreDispatch(this.calcScore());
    }

    this.saveInStorage();
  }

  saveInStorage() {
    const { player } = this.props;
    saveStorage('state', JSON.stringify({ player }));
  }

  calcScore() {
    const { time } = this.props;
    const SCORE_PARAM = 10;
    return SCORE_PARAM + (time * this.difficultyConditional());
  }

  difficultyConditional() {
    const { question: { difficulty } } = this.props;
    switch (difficulty) {
    case 'easy':
      return Number('1');
    case 'medium':
      return Number('2');
    case 'hard':
      return Number('3');
    default:
      return 0;
    }
  }

  render() {
    const { question: {
      question = '',
      category,
      aleatory_answers = [],
      correct_answer: correctAnswer,
    } } = this.props;
    const questionReplaced = question
      .replace(/&quot;/gi, '"')
      .replace(/&#039;/gi, '\'')
      .replace(/&rsquo;/gi, '\'')
      .replace(/&eacute;/gi, 'é');

    return (
      <div>
        <Timer />
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{questionReplaced}</p>

        <div className="answers">
          {aleatory_answers.map((alternative, index) => (
            <Alternative
              key={ index }
              correctAnswer={ correctAnswer }
              alternative={ alternative }
              verifyAnswer={ this.verifyAnswer }
            />))}
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ game, timer }) => ({
  player: game.player,
  time: timer.time,
  timerID: timer.timerID,
});

const mapDispatchToProps = (dispatch) => ({
  updateScoreDispatch: (score) => dispatch(updateScore(score)),
});

Question.propTypes = {
  question: shape({
    category: string,
    question: string,
  }),
  updateScoreDispatch: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
