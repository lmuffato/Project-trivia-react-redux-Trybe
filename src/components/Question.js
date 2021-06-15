import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timer } from '../actions';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.changeClass = this.changeClass.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);

    this.state = {
      addClass: false,
    };
  }

  componentDidMount() {
    this.decreaseTimer();
  }

  decreaseTimer() {
    const INTERVAL = 1000;

    setInterval(() => {
      const { time, dispatchTimer } = this.props;
      const remainTime = time - 1;
      if (remainTime >= 0) {
        dispatchTimer(remainTime);
      }
    }, INTERVAL);
  }

  decodeHtml(html) {
    const texto = document.createElement('textarea');
    texto.innerHTML = html;
    return texto.value;
  }

  changeClass() {
    this.setState({
      addClass: true,
    });
  }

  render() {
    const { question, time } = this.props;
    const { addClass } = this.state;
    return (
      <section>
        { time > 0 ? <span>{time}</span> : <span>Terminou</span>}
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ this.decodeHtml(question.question) }</p>
        { question.randomAnswers.map((answer, index) => {
          if (answer.correct) {
            return (
              <button
                data-testid="correct-answer"
                name="correct-answer"
                type="button"
                className={ addClass ? 'correct-answer' : 'qualquer-classe' }
                disabled={ time <= 0 }
                onClick={ this.changeClass }
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
              onClick={ this.changeClass }
              disabled={ time <= 0 }
              className={ addClass ? 'wrong-answer' : 'qualquer-classe' }
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
  time: PropTypes.number.isRequired,
  dispatchTimer: PropTypes.func.isRequired,
};

const mapStateToProps = ({ trivia }) => ({
  time: trivia.tempo,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchTimer: (time) => dispatch(timer(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
