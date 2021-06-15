import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.renderQuestion = this.renderQuestion.bind(this);
  }

  renderQuestion(results, index) {
    return (
      <>
        <h3>{results[index].question}</h3>
        <p data-testid="question-category">
          Category:
          { results[index].category }
        </p>
        <button type="button">{ results[index].correct_answer }</button>
        {results[index].incorrect_answers.map((elem) => (
          <button type="button" key={ elem }>{elem}</button>))}
      </>
    );
  }

  render() {
    const index = 0;
    const { results } = this.props;
    return (
      <div>
        {results.length !== 0
        && this.renderQuestion(results, index)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.game.perguntas,
});

Question.propTypes = {
  results: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Question);
