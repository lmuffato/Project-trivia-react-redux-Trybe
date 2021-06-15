import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Question extends React.Component {
  decodeHtml(html) {
    const texto = document.createElement('textarea');
    texto.innerHTML = html;
    return texto.value;
  }

  render() {
    const { question } = this.props;
    return (
      <section>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ this.decodeHtml(question.question) }</p>
        { question.randomAnswers.map((answer, index) => {
          if (answer.correct) {
            return (
              <button
                data-testid="correct-answer"
                name="correct-answer"
                type="button"
                className="correct-answer"
              >
                { this.decodeHtml(answer.correct) }
              </button>);
          }
          return (
            <button
              data-testid={ `wrong-answer-${index}` }
              name="wrong-answer"
              type="button"
              key={ `wrong-answer-${index}` }
              className="wrong-answer"
            >
              { this.decodeHtml(answer.incorrect) }
            </button>);
        })}
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
};

const mapStateToProps = ({ trivia }) => ({ trivia });

export default connect(mapStateToProps)(Question);
