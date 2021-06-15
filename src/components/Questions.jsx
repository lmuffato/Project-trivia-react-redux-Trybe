import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor(props) {
    super(props);

    const { questions } = this.props;
    this.selectAnswer = this.selectAnswer.bind(this);
    this.sortQuestions = this.sortQuestions.bind(this);
    this.countTime = this.countTime.bind(this);

    this.state = {
      questions,
      question: '',
      category: '',
      count: 0,
      gameOn: true,
      shuffleAnswers: [],
      correctAnswer: '',
      time: 30,
    };
  }

  componentDidMount() {
    this.sortQuestions();
    this.countTime();
  }

  countTime() {
    const interval = 1000;
    setInterval(() => (
      this.setState((prevState) => ({ time: prevState.time - 1 }))), interval);
  }

  selectAnswer({ target }) {
    const { correctAnswer } = this.state;
    if (correctAnswer === target.innerText) console.log('acertou');
    else console.log('errou');
    this.setState({ gameOn: false });
  }

  sortQuestions() {
    const { questions, count } = this.state;
    const {
      question,
      category,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer } = questions[count];
    const sortValue = 0.5;
    const shuffleAnswers = [...incorrectAnswer, correctAnswer]
      .sort(() => Math.random() - sortValue);
    this.setState({ shuffleAnswers, correctAnswer, question, category });
  }

  render() {
    const { question, category, gameOn, shuffleAnswers, correctAnswer } = this.state;
    const { time } = this.state;
    // this.countTime();
    return (
      <div>
        <div>
          <h3 data-testid="question-category">{category}</h3>
          <p data-testid="question-text">{question}</p>
        </div>
        <div>
          {shuffleAnswers.map((query, index) => {
            if (query === correctAnswer) {
              return (
                <p
                  key={ `answer-${index}` }
                >
                  <button
                    data-testid="correct-answer"
                    onClick={ this.selectAnswer }
                    type="button"
                    style={ gameOn ? null : { border: '3px solid rgb(6, 240, 15)' } }
                  >
                    { query }
                  </button>
                </p>);
            }
            return (
              <p
                key={ `answer-${index}` }
              >
                <button
                  style={ gameOn ? null : { border: '3px solid rgb(255, 0, 0)' } }
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.selectAnswer }
                  type="button"
                >
                  { query }
                </button>
              </p>
            );
          })}
        </div>
        <p>{time}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameData.questions,
});

Questions.propTypes = {
  questions: arrayOf(object),
}.isRequired;

export default connect(mapStateToProps, null)(Questions);
