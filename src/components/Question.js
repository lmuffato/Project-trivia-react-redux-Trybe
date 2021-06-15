import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonnext: false,
    };
    this.setNextButton = this.setNextButton.bind(this);
    this.setBorderColor = this.setBorderColor.bind(this);
  }

  setBorderColor() {
    const options = document.querySelectorAll('#options > button');
    options.forEach((op) => {
      if (op.attributes[1].value !== 'correct-answer') {
        op.style.border = '3px solid rgb(255, 0, 0)';
      } else {
        op.style.border = '3px solid rgb(6, 240, 15)';
      }
    });
    this.setNextButton();
  }

  setNextButton() {
    // const { buttonnext } = this.state;
    this.setState({
      buttonnext: true,
    });
  }

  render() {
    const { idQuestion, questions } = this.props;
    const { buttonnext } = this.state;
    let alternatives = [];
    alternatives = [
      ...questions[idQuestion].incorrect_answers,
      questions[idQuestion].correct_answer,
    ];
    return (
      <div>
        <div data-testid="question-category">
          { `Categoria: ${questions[idQuestion].category}` }
        </div>
        <div data-testid="question-text">
          <p>
            { `Question ${idQuestion + 1}: ${questions[idQuestion].question}` }
          </p>
        </div>
        <div id="options">
          { alternatives
            .map((alt, i) => (
              <button
                type="button"
                key={ i }
                data-testid={
                  questions[idQuestion].incorrect_answers
                    .includes(alt) ? `wrong-answer-${i}` : 'correct-answer'
                }
                onClick={ this.setBorderColor }
              >
                { alt }
              </button>
            )) }
        </div>
        <button
          type="button"
          id="buttonNext"
          data-testid="btn-next"
          style={ { visibility: buttonnext ? 'visible' : 'hidden' } }
        >
          Próxima Questão
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions.results,
});

Question.propTypes = {
  idQuestion: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Question);
