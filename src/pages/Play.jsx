import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestion } from '../redux/actions';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersOfRound: [],
      questionNumber: 0,
      questionOfRound: [],
    };

    this.mountRound = this.mountRound.bind(this);
  }

  async componentDidMount() {
    const { callApiToQuestions } = this.props;
    await callApiToQuestions();
    this.mountRound();
  }

  async mountRound() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const { category, question, incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = questions[questionNumber];
    let answersOfRound = incorrectAnswers.map((answer, index) => (
      <option key={ index } data-testid={ `wrong-answer-${index}` }>
        {answer}
      </option>
    ));
    answersOfRound.push(
      <option data-testid="correct-answer">
        {correctAnswer}
      </option>,
    );
    const probToChangePosition = 0.5;
    answersOfRound = answersOfRound.sort(() => Math.random() - probToChangePosition);
    const questionOfRound = (
      <aside key="question_field">
        <h3 key="category" data-testid="question-category">{`Categoria: ${category}`}</h3>
        <h3 key="question" data-testid="question-text">{question}</h3>
      </aside>
    );
    this.setState({ answersOfRound, questionOfRound });
  }

  render() {
    const { answersOfRound, questionOfRound } = this.state;
    return (
      <main>
        {questionOfRound}
        <aside>
          <select>
            {answersOfRound}
          </select>
        </aside>

        <button type="button">testar</button>
      </main>
    );
  }
}

Play.propTypes = {
  callApiToQuestions: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.player.questions,
});

const mapDispatchToProps = (dispatch) => ({
  callApiToQuestions: () => dispatch(fetchQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
