import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderTriviaGame from '../components/HeaderTriviaGame';
import Question from '../components/Question';
// import Timer from '../components/Timer';
import Answer from '../components/Answer';
import ButtonNext from '../components/ButtonNext';
import { shuffle } from '../helper';

class TriviaGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
    this.handleIndexIncrementOnClick = this.handleIndexIncrementOnClick.bind(this);
  }

  componentDidMount() {

  }

  handleIndexIncrementOnClick() {
    this.setState((oldState) => ({
      index: oldState.index + 1,
    }));
  }

  answersRandom(index) {
    const { questions } = this.props;
    if (questions.length) {
      const answers = [...questions[index].incorrect_answers,
        questions[index].correct_answer];
      return shuffle(answers);
    }
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    const questionsRandom = questions.length ? this.answersRandom(index) : 'xablau';
    return (
      <div>
        <HeaderTriviaGame />
        <div>
          {questions.length && <Question index={ index } />}
          {/* <Timer /> */}
        </div>
        <div>
          {questions.length && <Answer answers={ questionsRandom } />}
          <ButtonNext onClick={ this.handleIndexIncrementOnClick } />
        </div>
      </div>
    );
  }
}

TriviaGame.propTypes = {
  questions: PropTypes.arrayOf(),
};

TriviaGame.defaultProps = {
  questions: [],
};

const mapStateToProps = (state) => ({
  // isFetching: state.user.isFetching,
  questions: state.user.questions,
});

/* const mapDispatchToProps = (dispatch) => ({
 funcao que atualiza pontos
}); */

export default connect(mapStateToProps, null)(TriviaGame);
