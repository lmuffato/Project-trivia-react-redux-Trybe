import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import { ThunkTrivia } from '../REDUX/Actions';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      // hashEmail: '',
      questions: [],
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
    this.handleAnswers();

    this.setState({ index: index + 1, time: 30 });
  }

  // Função retirada do site https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
  shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    this.setState({ questions: arr });
  }

  handleAnswers() {
    const { questions } = this.props;
    const { index: index2 } = this.state;
    const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = questions[index2];
    const array = incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ index }
      >
        {answer}
      </button>
    ));
    array.push(
      <button
        type="button"
        data-testid="correct-answer"
        key={ array.length }
      >
        { correctAnswer }
      </button>,
    );
    return this.shuffleArray(array);
  }

  HandleTime() {
    const { time } = this.state;

    this.setState({ time: time - 1 });
  }

  render() {
    const { index, time, questions: questions2 } = this.state;
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
          {questions2}
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => this.handleindex() }
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
  questions: state.GameReducer.questions.results,
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
