import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionsApi } from '../../actions';
import { triviaAPI } from '../../services/api';
import Header from '../../components/Header';

class DisplayGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
    };

    this.fetchTrivia = this.fetchTrivia.bind(this);
  }

  async componentDidMount() {
    await this.fetchTrivia();
  }

  async fetchTrivia() {
    const { triviaQuestions, token } = this.props;
    const questions = await triviaAPI(token);

    triviaQuestions(questions);
  }

  checkAnswer() {
    const correctButton = document.querySelector('.correct-answer');
    const incorrectButtons = document.querySelectorAll('.wrong-answer');

    correctButton.style.border = '3px solid rgb(6, 240, 15)';
    incorrectButtons.forEach((button) => {
      button.style.border = '3px solid rgb(255, 0, 0)';
    });
  }

  createAnswers(question) {
    const answers = [question.correct_answer]
      .concat(question.incorrect_answers);

    return answers.map((answer, indexAnswer) => (
      <button
        type="button"
        key={ indexAnswer }
        value={ answer }
        data-testid={ question.correct_answer === answer
          ? 'correct-answer' : `wrong-answer-${indexAnswer}` }
        className={ indexAnswer === 0 ? 'correct-answer' : 'wrong-answer' }
        onClick={ this.checkAnswer }
      >
        { answer }
      </button>
    ));
  }

  render() {
    const { questionIndex } = this.state;
    const { questionsApiGames } = this.props;

    if (questionsApiGames === undefined) {
      return <div>Loading...</div>;
    }
    const { question, category } = questionsApiGames[questionIndex];

    return (
      <>
        <Header />
        <div>
          <span data-testid="question-category">{ category }</span>
          <h2 data-testid="question-text">{ question }</h2>
          <div>
            { this.createAnswers(questionsApiGames[questionIndex]) }
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsApiGames: state.questionsApi.questions.results,
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  triviaQuestions: (payload) => dispatch(questionsApi(payload)),
});

DisplayGame.propTypes = {
  questionsApi: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(DisplayGame);
