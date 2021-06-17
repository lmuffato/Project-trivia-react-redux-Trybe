import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
// import { ThunkTrivia } from '../REDUX/Actions';
// comentario

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      nextBtnVisible: 'none',
      selectedStyle: false,
      index: 0,
      time: 30,
      globalScore: 0,
      redirect: false,
    };
    this.handleindex = this.handleindex.bind(this);
    this.HandleTime = this.HandleTime.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    this.playTime();
  }

  componentDidUpdate() {
    const { time } = this.state;
    if (time === 0) {
      clearInterval(this.timeout);
    }
  }

  playTime() {
    const { time } = this.state;
    console.log('time');
    console.log(time);
    const segundo = 1000;
    const maxTime = 30;

    if (time <= maxTime && time > 0) {
      console.log('playtime');
      this.timeout = setInterval(this.HandleTime, segundo);
    }
  }

  HandleTime() {
    const { time } = this.state;
    this.setState({ time: time - 1 });
  }

  handleindex() {
    const { index } = this.state;
    const maxQuestion = 4;
    if (index === maxQuestion) {
      return this.setState({ redirect: true });
    }
    this.setState((prevState) => ({
      index: prevState.index + 1,
      time: 30,
      nextBtnVisible: 'none',
      selectedStyle: false,
    }), this.playTime);
  }

  updateScore(points) {
    const myLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { name, gravatarEmail, assertions: prevAssertions } = myLocalStorage.player;
    const assertions = Number(prevAssertions) + 1;
    if (myLocalStorage !== null) {
      const mlsNumber = Number(myLocalStorage.player.score);
      const state = {
        player: {
          name,
          assertions,
          score: (points + mlsNumber),
          gravatarEmail,
        },
      };
      localStorage.setItem('state', JSON.stringify(state));
      // localStorage.setItem('ranking', JSON.stringify(state));
      this.setState({
        globalScore: (points + mlsNumber),
      });
    } else {
      const state = {
        player: {
          name,
          assertions,
          score: points,
          gravatarEmail,
        },
      };
      localStorage.setItem('state', JSON.stringify(state));
      // localStorage.setItem('ranking', JSON.stringify(state));
      this.setState({
        globalScore: points,
      });
    }
  }

  handleClickAnswer(type, difficulty) {
    clearInterval(this.timeout);
    this.setState({ selectedStyle: true, nextBtnVisible: '' });
    let level = 0;
    const levelhard = 3;
    switch (difficulty) {
    case 'easy': (level = 1);
      break;
    case 'medium': (level = 2);
      break;
    case 'hard': (level = levelhard);
      break;
    default: (level = 1);
      break;
    }

    if (type === 'correct') {
      const tenPoints = 10;
      const { time } = this.state;
      const score = tenPoints + (time * level);
      this.updateScore(score);
      // localStorage.setItem('score', score);
    }
  }

  handleAnswers(answers, difficulty) {
    const { time, selectedStyle } = this.state;
    let answerDisabled = false;
    let corectborder = 'none';
    let wrongborder = 'none';
    if (time === 0) {
      answerDisabled = true;
    }
    if (selectedStyle === true) {
      corectborder = '3px solid rgb(6, 240, 15)';
      wrongborder = '3px solid rgb(255, 0, 0)';
    }

    return answers.map((answer, index) => {
      if (answer.correct === true) {
        return (
          <button
            type="button"
            data-testid="correct-answer"
            key={ index }
            onClick={ () => this.handleClickAnswer('correct', difficulty) }
            disabled={ answerDisabled }
            style={ { border: [corectborder] } }
          >
            { answer.text }
          </button>
        );
      }
      return (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          onClick={ () => this.handleClickAnswer('wrong', difficulty) }
          disabled={ answerDisabled }
          style={ { border: [wrongborder] } }
        >
          {answer.text}
        </button>
      );
    });
  }

  render() {
    const { index, time, nextBtnVisible, globalScore, redirect } = this.state;
    const { questions, isLoading } = this.props;

    let nextbtnvisible2 = nextBtnVisible;

    if (time === 0) {
      nextbtnvisible2 = '';
    }

    if (redirect === true) {
      return (<Redirect to="/feedback" />);
    }
    if (isLoading === false) {
      return (
        <section>
          <Header score={ globalScore } />
          <p data-testid="question-category">
            Categoria:
            {questions[index].category}
          </p>
          <p data-testid="question-text">
            {questions[index].question}
          </p>
          { this.handleAnswers(questions[index].answers, questions[index].difficulty)}
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => this.handleindex() }
            style={ { display: [nextbtnvisible2] } }
          >
            Próxima Pergunta
          </button>
          <div>
            { time }
          </div>
        </section>
      );
    } return (
      <div>Loading</div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.GameReducer.questions,
  isLoading: state.GameReducer.isLoading,
});

const mapDispatchToProps = () => ({
  // getTrivia: (token) => dispatch(
  //   ThunkTrivia(token),
  // ),
  // action: (name, email) => dispatch(actionLogin(name, email)),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.objectOf()).isRequired,
  isLoading: PropTypes.string.isRequired,
  // getTrivia: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
