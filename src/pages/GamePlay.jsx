import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import Header from '../components/Header';
import './GamePlay.css';

class GamePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      nextQuestionBtn: true,
      visible: false,
      dificuldade: {
        hard: {
          value: 3,
          name: 'hard',
        },
        medium: {
          value: 2,
          name: 'medium',
        },
        easy: {
          value: 1,
          name: 'easy',
        },
      },
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.showNextQuestionBtn = this.showNextQuestionBtn.bind(this);
    this.score = this.score.bind(this);
  }

  componentDidMount() {
    const { token, fecthQuestionsAction } = this.props;
    fecthQuestionsAction(token);
  }

  handleClick(value) {
    const three = 3;
    this.setState({ index: value, visible: false });
    const { index } = this.state;
    if (index === three) {
      this.setState({ nextQuestionBtn: false });
    }
  }

  score({ difficulty }) {
    const { dificuldade } = this.state;
    const { hard, medium, easy } = dificuldade;
    const number = 10;
    let score;

    switch (difficulty) {
    case (difficulty === hard.name):
      score = number + hard.value;
      console.log(score);
      break;
    case (difficulty === medium.name):
      score = number + medium.value;
      console.log(score);
      break;
    case (difficulty === easy.name):
      score = number + easy.value;
      console.log(score);
      break;
    default:
      return 'Deu ruim !';
    }
  }

  showNextQuestionBtn() {
    this.setState({ visible: true });
  }

  renderQuestion(question) {
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = question;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ () => {
            this.showNextQuestionBtn();
            this.score(question);
          } }
        >
          { correctAnswer }
        </button>
        {
          incorrectAnswers.map((e, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.showNextQuestionBtn() }
            >
              {e}
            </button>
          ))
        }
      </div>
    );
  }

  renderQuestions() {
    const { questions } = this.props;
    const { index, nextQuestionBtn, visible } = this.state;
    return (
      <section>
        { this.renderQuestion(questions[index]) }
        <button
          type="button"
          disabled={ !nextQuestionBtn }
          className={ visible ? 'show-btn' : 'hide-btn' }
          data-testid="btn-next"
          onClick={ () => this.handleClick(index + 1) }
        >
          Próxima
        </button>
      </section>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <>
        <Header />
        <main>
          { loading ? 'Loading' : this.renderQuestions() }
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
  questions: state.triviaReducer.questions,
  loading: state.triviaReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fecthQuestionsAction: (token) => dispatch(fetchQuestions(token)),
});

GamePlay.propTypes = {
  loading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay);
