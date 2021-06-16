import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
      correctClass: 'answer',
      wrongClass: 'answer',
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.showNextQuestionBtn = this.showNextQuestionBtn.bind(this);
    this.handleAlternativeClick = this.handleAlternativeClick.bind(this);
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

  showNextQuestionBtn() {
    this.setState({ visible: true });
  }

  showFeedback() {
    return (
      <Redirect to="/feedback" />
    );
  }

  handleAlternativeClick() {
    // Adição de classe em React baseada em pesquisa no StackOverflow no link:
    // https://stackoverflow.com/questions/28732253/how-to-add-or-remove-a-classname-on-event-in-reactjs
    this.setState((prevState) => ({
      correctClass: `${prevState.correctClass} correct`,
      wrongClass: `${prevState.wrongClass} wrong`,
    }));
    this.showNextQuestionBtn();
  }

  renderQuestion(question) {
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = question;
    const { correctClass, wrongClass, visible } = this.state;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <button
          type="button"
          data-testid="correct-answer"
          className={ visible ? correctClass : '' }
          onClick={ this.handleAlternativeClick }
        >
          { correctAnswer }
        </button>
        {
          incorrectAnswers.map((e, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              className={ visible ? wrongClass : '' }
              onClick={ this.handleAlternativeClick }
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
    const { index, visible } = this.state;
    const numberThree = 3;
    return (
      <>
        <Header />
        <main>
          { loading ? 'Loading' : this.renderQuestions() }
          { index > numberThree && visible ? this.showFeedback() : '' }
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
