import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import { ThunkTrivia } from '../REDUX/Actions';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      nextBtnVisible: 'none',
      selectedStyle: false,
      index: 0,
      time: 30,
    };
    this.handleindex = this.handleindex.bind(this);
    this.HandleTime = this.HandleTime.bind(this);
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
    // const { index } = this.state;
    this.setState((prevState) => ({
      index: prevState.index + 1,
      time: 30,
      nextBtnVisible: 'none',
      selectedStyle: false,
    }), this.playTime);
  }

  handleClickAnswer(type, difficulty) {
    clearInterval(this.timeout);
    this.setState({ selectedStyle: true, nextBtnVisible: '' });
    if (type === true) {
      console.log(type);
      const { time } = this.state;
      // level: easy: 1, medium: 2, hard: 3
      // score = 10 + (time * level[difficulty])
    }
  }

  handleAnswers(answers) {
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
            onClick={ () => this.handleClickAnswer('correct') }
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
          onClick={ () => this.handleClickAnswer('wrong') }
          disabled={ answerDisabled }
          style={ { border: [wrongborder] } }
        >
          {answer.text}
        </button>
      );
    });
  }

  render() {
    const { index, time, nextBtnVisible } = this.state;
    const { questions, isLoading } = this.props;

    let nextbtnvisible2 = nextBtnVisible;

    if (time === 0) {
      nextbtnvisible2 = '';
    }

    if (isLoading === false) {
      return (
        <section>
          <Header />
          <p data-testid="question-category">
            Categoria:
            {questions[index].category}
          </p>
          <p data-testid="question-text">
            {questions[index].question}
          </p>
          { this.handleAnswers(questions[index].answers)}
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
