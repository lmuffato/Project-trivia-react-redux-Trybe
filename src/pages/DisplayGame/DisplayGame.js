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
    console.log('Chegou aqui?');
    const { triviaQuestions, token } = this.props;
    const questions = await triviaAPI(token);
    triviaQuestions(questions);
  }

  createAnswers(question) {
    console.log('Estou na function');
    const answers = question.incorrect_answers
      .concat(question.correct_answer);
    return answers.map((answer, indexAnswer) => (
      <button
        type="button"
        key={ indexAnswer }
        value={ answer }
        data-testid={ question.correct_answer === answer
          ? 'correct-answer' : `wrong-answer-${indexAnswer}` }
      >
        { answer }
      </button>
    ));
  }

  render() {
    const { questionIndex } = this.state;
    const { questionsApiGames } = this.props;
    console.log(questionsApiGames);

    if (questionsApiGames === undefined) {
      return <div>Loading...</div>;
    }
    const { question, category } = questionsApiGames[questionIndex];
    console.log('eh tu mesmo!', questionsApiGames[questionIndex]);
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
