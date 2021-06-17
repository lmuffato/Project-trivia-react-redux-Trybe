import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles.css';

class SingleQuestion extends Component {
  constructor() {
    super();

    this.state = {
      chosedQuestion: false,
      disableBtn: false,
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

  answerClick(event) {
    const { index, questions } = this.props
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
    return (
      <div>
       {loading === true ? <p>carregando...</p>
          : <div>
            <h1>Questão {`${index +1}`}</h1>
            <p data-testid="question-category">{questions[index].category}</p>
            <p>{questions[index].difficulty}</p>
            <p data-testid="question-text">{questions[index].question}</p>
            <button
              type="button"
              data-testid="correct-answer"
              onClick={this.answerClick}
              value={questions[index].correct_answer}
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
                  onClick={this.answerClick}
                  value={ia}
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

