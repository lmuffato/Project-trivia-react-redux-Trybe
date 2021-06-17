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

  }

  resetBtn() {
      this.setState({
        chosedQuestion: false,
        disableBtn: false,
      })
  }

  componentDidMount() {
    const second = 1000;
    this.intervalFunc = setInterval(() => this.timer(), second);
  }

  timer() {
    const { time, index } = this.state;
    if (time === 1) {
      clearInterval(this.intervalFunc);
      this.setState({
        index: index + 1,
        chosedQuestion: true,
      });
    }
    return this.setState({ time: time - 1 });
  }

  answerClick(event) {
    const { index, chosedQuestion } = this.state;
    const { questions } = this.props;
    if (event.target.value === questions[index].correct_answer) {
      this.setState({
        chosedQuestion: true,
        disableBtn: true,
      })
    } else {
      this.setState({
        chosedQuestion: true,
        disableBtn: true,
      })
    }
  }

  render() {
    const { index, questions, loading, callNext } = this.props;
    const {chosedQuestion, disableBtn} = this.state
    const { questions, loading } = this.props;
    const { index, chosedQuestion, time } = this.state;
    return (
      <div>
       {loading === true ? <p>carregando...</p>
          : <div>
            <h1>Questão {`${index +1}`}</h1>
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
             </div>
       }
          {disableBtn === false ? null :
            <button data-testid="btn-next" onClick={ () => {callNext(); this.resetBtn()} }>Pŕoxima</button>
          }
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions.results,
  loading: state.questions.loading,
});

export default connect(mapStateToProps, null)(SingleQuestion);

