import React from 'react';
import { Link } from 'react-router-dom';
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
    };
    this.requestApi = this.requestApi.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.ramdomizeQuestions = this.ramdomizeQuestions.bind(this);
    this.runTimer = this.runTimer.bind(this);
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
    const { timer, isVisible } = this.state;
    const crrQuestion = quests[indice];
    return (
      <div>
        <Header />
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
            onClick={ () => (this.setState({ userAnswer: true })) }
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
    return (
      loading || indice > limite ? <p>Loading...</p> : this.renderQuestions()
    );
  }
}

export default Game;
