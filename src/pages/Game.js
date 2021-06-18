import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import * as api from '../services/datasApi';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quests: [],
      alternativeRandom: [],
      indice: 0,
      loading: true,
      userAnswer: false,
      timer: 30,
      isVisible: true,
      score: 0,
    };
    this.requestApi = this.requestApi.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.ramdomizeQuestions = this.ramdomizeQuestions.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    this.requestApi();
  }

  getScore() {
    const { quests, indice, timer } = this.state;
    const { difficulty } = quests[indice];
    const questionValue = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    switch (difficulty) {
    case 'hard':
      return (hard * timer) + questionValue;
    case 'medium':
      return (medium * timer) + questionValue;
    case 'easy':
      return (easy * timer) + questionValue;
    default:
      return 0;
    }
  }

  requestApi() {
    const token = JSON.parse(localStorage.getItem('token'));
    api.fetchQuest(token).then((res) => {
      this.setState({
        quests: res.results,
        loading: false,
      });
      this.runTimer();
      this.ramdomizeQuestions();
    });
  }

  checkAnswer(correctAnswer, event) {
    console.log('e');
    event.preventDefault();
    this.setState({ userAnswer: true });
    const state = JSON.parse(localStorage.getItem('state'));
    if (event.target.innerText === correctAnswer) {
      console.log('a');
      const { assertions, score } = state.player;
      state.player.score = score + this.getScore();
      state.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(state));
      this.setState({ score: state.player.score });
    }
  }

  changeAnswer(alternative, crrQuestion) {
    return alternative === crrQuestion.correct_answer
      ? 'ok' : 'fail';
  }

  runTimer() {
    const oneSec = 1000;
    setInterval(() => {
      this.setState((prev) => {
        if (prev.timer <= 0 || prev.userAnswer === true) {
          return { timer: prev.timer, userAnswer: true, isVisible: false };
        }
        return { timer: prev.timer - 1 };
      });
    }, oneSec);
  }

  ramdomizeQuestions() {
    const { quests, indice } = this.state;
    const crrQuestion = quests[indice];
    const altenativesOld = crrQuestion.incorrect_answers
      .concat(crrQuestion.correct_answer);
    const numMagic = 0.5;
    const alternatives = altenativesOld.sort(() => Math.random() - numMagic);
    this.setState(() => ({
      userAnswer: false,
      alternativeRandom: alternatives,
      isVisible: true,
    }));
  }

  renderQuestions() {
    const { quests, indice, userAnswer, alternativeRandom } = this.state;
    const { timer, isVisible, score } = this.state;
    const crrQuestion = quests[indice];
    return (
      <div>
        <Header score={ score } />
        <h3>
          Tempo:
          { timer }
        </h3>
        <p data-testid="question-category">
          {crrQuestion.category}
        </p>
        <p data-testid="question-text">
          {crrQuestion.question}
        </p>
        {alternativeRandom.map((alternative, index) => (
          <button
            disabled={ userAnswer || timer < 1 }
            type="button"
            value={ alternative }
            key={ Math.random() }
            onClick={ (event) => (this.checkAnswer(crrQuestion.correct_answer, event)) }
            className={ userAnswer ? this.changeAnswer(alternative, crrQuestion) : null }
            data-testid={ alternative === crrQuestion.correct_answer ? 'correct-answer'
              : `wrong-answer-${index}` }
          >
            {alternative}
          </button>
        ))}
        <button
          type="button"
          hidden={ isVisible }
          data-testid="btn-next"
          onClick={
            () => this.setState((prevState) => (
              { indice: prevState.indice + 1, userAnswer: false, timer: 30 }
            ), () => this.ramdomizeQuestions(), this.getScore())
          }
        >
          Próximo
        </button>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
      </div>
    );
  }

  render() {
    const { loading, indice } = this.state;
    const limite = 4;
    if (indice > limite) {
      return <Redirect to="/feedback" />;
    }
    return (
      loading || indice > limite ? <p>Loading...</p> : this.renderQuestions()
    );
  }
}

export default Game;
