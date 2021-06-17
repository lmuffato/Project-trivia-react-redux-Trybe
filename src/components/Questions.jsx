import React, { Component } from 'react';
import { string, arrayOf, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Alternatives from './Alternatives';
import { updateScore } from '../redux/actions/actions';

class Questions extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      currentIndex: 0,
      redirect: false,
    };
    this.setScore = this.setScore.bind(this);
    this.saveInStorage = this.saveInStorage.bind(this);
    this.handleClickNextButton = this.handleClickNextButton.bind(this);
  }

  async setScore(shouldCalc) {
    const { currentIndex } = this.state;
    const { questions, timer, time, saveScore } = this.props;
    const currentQuestion = questions[currentIndex];
    const { difficulty } = currentQuestion;
    const THREE_POINTS = 3;
    const SCORE_PARAM = 10;

    const difficultyConditional = () => {
      switch (difficulty) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return THREE_POINTS;
      default:
        return 0;
      }
    };

    clearInterval(timer.timer);

    if (shouldCalc === true) {
      const score = SCORE_PARAM + (time * difficultyConditional());
      await saveScore(score);
    }

    this.saveInStorage();
  }

  saveInStorage() {
    const { assertions, score, nome, email } = this.props;

    const player = { assertions, score };
    player.name = nome;
    player.gravatarEmail = email;

    const json = JSON.stringify({ player });

    localStorage.setItem('state', json);
  }

  handleClickNextButton() {
    const { setRevelaBorda, setTimer, questions } = this.props;
    const { currentIndex } = this.state;
    setRevelaBorda('');
    setTimer({ time: 30 });
    if (currentIndex === questions.length - 1) {
      this.setState({ redirect: true });
    } else {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1,
      }));
    }
  }

  render() {
    const { currentIndex, redirect } = this.state;
    const { questions, revelaBorda, setRevelaBorda } = this.props;

    const currentQuestion = questions[currentIndex];

    const aleatoryAnswers = currentQuestion.aleatory_answers;

    if (redirect) {
      return (<Redirect to="/feedback" />);
    }

    return (
      <Alternatives
        onClick={ this.handleClickNextButton }
        setScore={ this.setScore }
        question={ currentQuestion }
        aleatoryAnswers={ aleatoryAnswers }
        correctAnswer={ currentQuestion.correct_answer }
        revelaBorda={ revelaBorda }
        setRevelaBorda={ setRevelaBorda }
      />);
  }
}

Questions.propTypes = {
  questions: arrayOf(
    shape({
      correct_answer: string,
      incorrect_answers: arrayOf(string),
      aleatory_answers: arrayOf(string),
    }),
  ).isRequired,
  revelaBorda: string,
  difficulty: string,
  setRevelaBorda: func,
}.isRequired;

const mapStateToProps = (state) => ({
  timer: state.jogoReducer.time,
  assertions: state.jogoReducer.player.assertions,
  score: state.jogoReducer.player.score,
  nome: state.loginReducer.user.nome,
  email: state.loginReducer.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  saveScore: (payload) => dispatch(updateScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
