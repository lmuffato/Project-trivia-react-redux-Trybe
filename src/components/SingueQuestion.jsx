import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles.css';

class SingleQuestion extends Component {
  constructor() {
    super();

    this.timer = this.timer.bind(this);
    this.answerClick = this.answerClick.bind(this);

    this.state = {
      chosedQuestion: false,
      disableBtn: false,
      time: 30,
    };

    this.answerClick = this.answerClick.bind(this);
    this.resetBtn = this.resetBtn.bind(this);
    this.sumScore = this.sumScore.bind(this);
  }

  resetBtn() {
    this.setState({
      chosedQuestion: false,
      disableBtn: false,
      time: 30,
    });
  }

  componentDidMount() {
    const second = 1000;
    this.intervalFunc = setInterval(() => this.timer(), second);
  }

  timer() {
    const { time } = this.state;
    const { callNext, index } = this.props;
    if (time === 1 && index <= 4) {
      clearInterval(this.intervalFunc);
      this.setState({
        chosedQuestion: true,
        disableBtn: true,
      });
      callNext();
    } else if (index === 4) {
      console.log('cabo o jogo, vai lavar louça');
      // Rota para /ranking
    }
    return this.setState({ time: time - 1 });
  }

  answerClick(event) {
    const { questions, index } = this.props;
    if (event.target.value === questions[index].correct_answer) {
      this.setState({
        chosedQuestion: true,
        disableBtn: true,
      });
      this.sumScore();
    } else {
      this.setState({
        chosedQuestion: true,
        disableBtn: true,
      });
    }
  }

  sumScore() {
    const { time } = this.state;
    const { questions, index } = this.props;
    let newScore = 0;
    const ten = 10;
    const one = 1;
    const two = 2;
    const three = 3;
    const objState = JSON.parse(localStorage.getItem('state'));
    const { score, assertions, ...spread } = objState.player;
    if (questions[index].difficulty === 'easy') {
      newScore = (time * one) + ten;
    } else if (questions[index].difficulty === 'medium') {
      newScore = (time * two) + ten;
    } else if (questions[index].difficulty === 'hard') {
      newScore = (time * three) + ten;
    }
    const player = { player: { ...spread,
      assertions: assertions + 1,
      score: score + newScore,
    } };

    return localStorage.setItem('state', JSON.stringify(player));
  }

  render() {
    const { index, questions, loading, callNext } = this.props;
    const { chosedQuestion, disableBtn, time } = this.state;
    return (
      <div>
        {loading === true ? <p>carregando...</p>
          : <div>
            <h1>
              Questão
              {`${index + 1}`}
            </h1>
            <h1>{ time }</h1>
            <p data-testid="question-category">{questions[index].category}</p>
            <p>{questions[index].difficulty}</p>
            <p data-testid="question-text">{questions[index].question}</p>
            <button
              type="button"
              data-testid="correct-answer"
              onClick={ this.answerClick }
              value={ questions[index].correct_answer }
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
                  onClick={ this.answerClick }
                  value={ ia }
                  className={ chosedQuestion ? 'incorrect' : null }
                  disabled={ chosedQuestion }
                >
                  {ia}
                </button>
              ))}
            </div>}
        {disableBtn === false ? null
          : <button data-testid="btn-next" onClick={ () => { callNext(); this.resetBtn(); } }>Pŕoxima</button>}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions.results,
  loading: state.questions.loading,
});

export default connect(mapStateToProps, null)(SingleQuestion);