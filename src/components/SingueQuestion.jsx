import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles.css';

class SingleQuestion extends Component {
  constructor() {
    super();

    this.timer = this.timer.bind(this);
    this.answerClick = this.answerClick.bind(this);
    this.randomizeQuestions = this.randomizeQuestions.bind(this);

    this.state = {
      chosedQuestion: false,
      disableBtn: false,
      time: 30,
    };

    this.answerClick = this.answerClick.bind(this);
    this.resetBtn = this.resetBtn.bind(this);
    this.sumScore = this.sumScore.bind(this);
  }

  componentDidMount() {
    // const { loading } = this.props;
    const second = 1000;
    this.intervalFunc = setInterval(() => this.timer(), second);
  }

  resetBtn() {
    this.setState({
      chosedQuestion: false,
      disableBtn: false,
      time: 30,
    });
  }

  randomizeQuestions() {
    const { questions, index } = this.props;
    const randomQuestions = questions[index].incorrect_answers
      .concat(questions[index].correct_answer);
    // for (let i = randomQuestions.length - 1; i > 0; i -= 1) {
    //   const j = Math.floor(Math.random() * i);
    //   const k = randomQuestions[i];
    //   randomQuestions[i] = randomQuestions[j];
    //   randomQuestions[j] = k;
    //   console.log(randomQuestions);
    // }
    console.log(randomQuestions);
    return randomQuestions;
  }

  timer() {
    const { time } = this.state;
    const { callNext, index } = this.props;
    const maxIndex = 4;
    if (time === 1 && index <= maxIndex) {
      clearInterval(this.intervalFunc);
      this.setState({
        chosedQuestion: true,
        disableBtn: true,
      });
      callNext();
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
    const { questions, index, updateScore } = this.props;
    let newScore = 0;
    const ten = 10;
    const one = 1;
    const two = 2;
    const three = 3;
    const objState = JSON.parse(localStorage.getItem('state'));
    const { score, assertions, ...spread } = objState.player;
    if (questions[index].difficulty === 'easy') newScore = (time * one) + ten;
    else if (questions[index].difficulty === 'medium') newScore = (time * two) + ten;
    else if (questions[index].difficulty === 'hard') newScore = (time * three) + ten;
    const player = { player: { ...spread,
      assertions: assertions + 1,
      score: score + newScore,
    } };
    updateScore(newScore);
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
              { questions[index].correct_answer }
            </button>
            { questions[index].incorrect_answers
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
                  { ia }
                </button>
              ))
            }
            { disableBtn === false ? null
              : <button
               type="button"
               data-testid="btn-next"
               onClick={ () => { callNext(); this.resetBtn(); } }
                >
                Pŕoxima
                </button> }
          </div>}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions.results,
  loading: state.questions.loading,
});

SingleQuestion.propTypes = {
  callNext: PropTypes.func,
  questions: PropTypes.arrayOf(Object),
  index: PropTypes.number,
  loading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, null)(SingleQuestion);
