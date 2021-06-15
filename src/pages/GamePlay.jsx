import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

class GamePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    this.questionsArray();
  }

  questionsArray() {
    const { token, fecthQuestionsAction } = this.props;
    fecthQuestionsAction(token);
  }

  renderQuestion() {
    return (
      <div>
        Pergunta
      </div>
    );
  }

  render() {
    return (
      <h1>Gameplay</h1>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
  questions: state.triviaReducer.questions,
});

const mapDispatchtoProps = (dispatch) => ({
  fecthQuestionsAction: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(GamePlay);
