import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import { fetchQuestions } from '../actions';
import { conditionScore } from '../services/score';
import Header from '../components/Header';
import './GamePlay.css';

class GamePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      disable: false,
      visible: false,
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
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.showNextQuestionBtn = this.showNextQuestionBtn.bind(this);
    this.score = this.score.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.showNextQuestionBtn = this.showNextQuestionBtn.bind(this);
    this.handleAlternativeClick = this.handleAlternativeClick.bind(this);
    this.timeCondition = this.timeCondition.bind(this);
    // this.sendLocalStorage = this.sendLocalStorage.bind(this);
  }

  componentDidMount() {
    const { token, fecthQuestionsAction } = this.props;
    fecthQuestionsAction(token);
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

  sendLocalStorage(points, props) {
    const { nameStore, emailStore } = props;
    const { player } = this.state;

    let correctAnswer;
    correctAnswer = 0;
    correctAnswer += 1;
    points += points;

    this.setState({
      player: {
        name: nameStore,
        assertions: correctAnswer,
        score: points,
        gravatarEmail: emailStore,
      },
    });

    console.log(player);
  }

  score(difficulty) {
    const { props, state } = this;
    const { dificuldade } = state;
    const points = conditionScore(difficulty, dificuldade, props);
    console.log(points);
    // sendLocalStorage(points, props);
  }

  showNextQuestionBtn(difficulty) {
    this.setState({ visible: true });
    this.score(difficulty);
  }

  timerComponent() {
    const { stop, seconds } = this.state;
    return (
      <Timer
        seconds={ seconds }
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
  nameStore: state.player.name,
  emailStore: state.player.playerEmail,
  questions: state.triviaReducer.questions,
  loading: state.triviaReducer.isLoading,
  secondsStore: state.triviaReducer.seconds,
});

const mapDispatchToProps = (dispatch) => ({
  fecthQuestionsAction: (token) => dispatch(fetchQuestions(token)),
});

GamePlay.propTypes = {
  loading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay);
