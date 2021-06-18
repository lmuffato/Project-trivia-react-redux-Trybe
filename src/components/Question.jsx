import React, { Component } from 'react';
import { string, shape, number, func } from 'prop-types';
import { connect } from 'react-redux';
import Alternative from './Alternative';
import Timer from './Timer';
import { saveStorage } from '../services/storage';
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
    const { name, gravatarEmail, score, assertions } = this.props;

    const state = {
      player: {
        name,
        gravatarEmail,
        score,
        assertions,
      },
    };

    saveStorage('state', JSON.stringify(state));
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

const mapStateToProps = ({ user, game, timer }) => ({
  name: user.name,
  gravatarEmail: user.email,
  score: game.player.score,
  assertions: game.player.assertions,
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
  name: string,
  gravatarEmail: string,
  score: number,
  assertions: number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
