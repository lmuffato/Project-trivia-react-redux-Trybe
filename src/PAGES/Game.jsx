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
      // Gravatar: {},
      index: 0,
    };
    this.handleindex = this.handleindex.bind(this);
  }

  // componentDidMount() {
  //   const { getTrivia, token } = this.props;
  //   getTrivia(token);
  // }

  handleindex() {
    const { index } = this.state;

    this.setState({ index: index + 1 });
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
    return arr;
  }

  handleAnswers(obj) {
    const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = obj;
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

  render() {
    const { index } = this.state;
    const { questions } = this.props;
    if (questions !== undefined) {
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
          {this.handleAnswers(questions[index])}
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => this.handleindex() }
          >
            Próxima Pergunta
          </button>
        </section>
      );
    } return (
      <div>Loading</div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.GameReducer.questions.results,
});

const mapDispatchToProps = () => ({
  // getTrivia: (token) => dispatch(
  //   ThunkTrivia(token),
  // ),
  // action: (name, email) => dispatch(actionLogin(name, email)),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.objectOf()).isRequired,
  // getTrivia: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
