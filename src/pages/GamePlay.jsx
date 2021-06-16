import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import Header from '../components/Header';

class GamePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      nextQuestionBtn: true,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    const { token, fecthQuestionsAction } = this.props;
    fecthQuestionsAction(token);
  }

  handleClick(value) {
    const three = 3;
    const { index } = this.state;
    if (index === three) {
      this.setState({ nextQuestionBtn: false });
    }
    this.setState({ index: value });
  }

  renderQuestion(question) {
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = question;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <button type="button" data-testid="correct-answer">
          { correctAnswer }
        </button>
        {
          incorrectAnswers.map((e, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
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
    const { index, nextQuestionBtn } = this.state;
    return (
      <section>
        { this.renderQuestion(questions[index]) }
        <button
          type="button"
          disabled={ !nextQuestionBtn }
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
