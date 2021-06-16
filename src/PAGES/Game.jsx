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
    const { time } = this.state;
    const segundo = 1000;
    const maxTime = 30;

    if (time <= maxTime && time > 0) {
      this.timeout = setInterval(this.HandleTime, segundo);
    }
  }

  componentDidUpdate() {
    const { time } = this.state;
    if (time === 0) {
      clearInterval(this.timeout);
    }
  }

  handleindex() {
    const { index } = this.state;

    this.setState({
      index: index + 1,
      time: 30,
      nextBtnVisible: 'none',
      selectedStyle: false });
  }

  handleClickAnswer(type) {
    clearInterval(this.timeout);
    this.setState({ selectedStyle: true, nextBtnVisible: '' });
    if (type === true) {
      console.log(type);
    }
  }

  handleAnswers(answers) {
    const { time, selectedStyle } = this.state;
    let answerDisabled = false;
    let corectBorder = 'none';
    let wrongBorder = 'none';
    if (time === 0) {
      answerDisabled = true;
    }
    if (selectedStyle === true) {
      corectBorder = '3px solid rgb(6, 240, 15)';
      wrongBorder = '3px solid rgb(255, 0, 0)';
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
            style={ { border: [corectBorder] } }
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
          style={ { border: [wrongBorder] } }
        >
          {answer.text}
        </button>
      );
    });
  }

  HandleTime() {
    const { time } = this.state;

    this.setState({ time: time - 1 });
  }

  render() {
    const { index, time, nextBtnVisible } = this.state;
    const { questions, isLoading } = this.props;

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
            style={ { display: [nextBtnVisible] } }
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
