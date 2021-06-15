import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import Header from '../components/Header';

class GamePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    const { token, fecthQuestionsAction } = this.props;
    fecthQuestionsAction(token);
  }

  renderBooleanQuestion(question) {
    const { correct_answer } = question;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <button type="button" data-testid="correct-answer">
          { correct_answer }
        </button>
        {
          question.incorrect_answers.map((e, index) => (
            <button
              key={ index + 1 }
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

  renderMultipleQuestion(q) {
    const { correct_answer } = q;
    return (
      <div>
        <p data-testid="question-category">{q.category}</p>
        <p data-testid="question-text">{q.question}</p>
        <button type="button" data-testid="correct-answer">
          { correct_answer }
        </button>
        {
          q.incorrect_answers.map((e, index) => (
            <button
              key={ index + 1 }
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
    return (
      <p>
        {
          questions.map((e) => (e.type === 'boolean'
            ? this.renderBooleanQuestion(e) : this.renderMultipleQuestion(e)))
        }
      </p>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <>
        <Header />
        <main>
          <section>
            { loading ? 'Loading' : this.renderQuestions() }
          </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay);
