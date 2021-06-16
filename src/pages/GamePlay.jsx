import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import { fetchQuestions } from '../actions';
import Header from '../components/Header';
import './GamePlay.css';

class GamePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      disable: false,
      visible: false,
      lastTime: 0,
      stop: false,
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
      correctClass: 'answer',
      wrongClass: 'answer',
      // player: {
      //   name: '',
      //   assertions: 0,
      //   score: 0,
      //   gravatarEmail: '',
      // },
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.showNextQuestionBtn = this.showNextQuestionBtn.bind(this);
    this.score = this.score.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.showNextQuestionBtn = this.showNextQuestionBtn.bind(this);
    this.handleAlternativeClick = this.handleAlternativeClick.bind(this);
    this.timeCondition = this.timeCondition.bind(this);
    this.getSeconds = this.getSeconds.bind(this);
  }

  componentDidMount() {
    const { token, fecthQuestionsAction } = this.props;
    fecthQuestionsAction(token);
  }

  getSeconds(seconds) {
    this.setState({
      lastTime: seconds,
    });
  }

  timeCondition() {
    this.setState({
      disable: true,
      visible: true,
    });
  }

  handleClick(value) {
    const four = 4;
    const { history } = this.props;
    this.setState({
      index: value,
      correctClass: 'answer',
      wrongClass: 'answer',
    });

    if (value > four) {
      history.push('/feedback');
    }
  }

  score(difficulty) {
    const { dificuldade, lastTime } = this.state;
    const { hard, medium, easy } = dificuldade;
    const number = 10;
    let score;

    console.log(difficulty);
    console.log('tempo', lastTime);

    switch (difficulty) {
    case (hard.name):
      score = number + (lastTime * hard.value);
      console.log(score);
      break;
    case (medium.name):
      score = number + (lastTime * medium.value);
      console.log(score);
      break;
    case (easy.name):
      score = number + (lastTime * easy.value);
      console.log(score);
      break;
    default:
      return 'Deu ruim !';
    }
  }

  showNextQuestionBtn(difficulty) {
    this.setState({ visible: true });
    this.score(difficulty);
  }

  timerComponent() {
    const { stop } = this.state;
    return (
      <Timer
        timeCondition={ this.timeCondition }
        getSeconds={ this.getSeconds }
        stop={ stop }
      />
    );
  }

  handleAlternativeClick(difficulty) {
    // Adição de classe em React baseada em pesquisa no StackOverflow no link:
    // https://stackoverflow.com/questions/28732253/how-to-add-or-remove-a-classname-on-event-in-reactjs
    this.setState((prevState) => ({
      correctClass: `${prevState.correctClass} correct`,
      wrongClass: `${prevState.wrongClass} wrong`,
      stop: true,
    }));
    this.showNextQuestionBtn(difficulty);
  }

  renderQuestion(question) {
    const { difficulty, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = question;
    const { correctClass, wrongClass, disable } = this.state;
    const isDisabled = disable;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <button
          type="button"
          data-testid="correct-answer"
          disabled={ isDisabled }
          onClick={ () => this.handleAlternativeClick(difficulty) }
          className={ correctClass }
        >
          { correctAnswer }
        </button>
        {
          incorrectAnswers.map((e, index) => (
            <button
              key={ index }
              type="button"
              disabled={ isDisabled }
              data-testid={ `wrong-answer-${index}` }
              onClick={ () => this.handleAlternativeClick() }
              className={ wrongClass }
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
    const { index, visible } = this.state;
    return (
      <section>
        { this.renderQuestion(questions[index]) }
        <button
          type="button"
          // disabled={ !nextQuestionBtn }
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
        { loading ? ''
          : this.timerComponent() }
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
