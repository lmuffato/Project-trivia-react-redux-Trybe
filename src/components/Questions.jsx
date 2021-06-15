import React from 'react';
import { connect } from 'react-redux';
import { getQuestionThunk } from '../redux/actions';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { token, getQuestions, loadingToken, loadingQuestions } = this.props;
    console.log(loadingToken);
    getQuestions(token);
  }

  onClick() {
    this.setState((previous) => ({ index: previous.index + 1 }));
  }

  render() {
    const { questions, loadingQuestions, loadingToken } = this.props;
    const { index } = this.state;
    console.log(loadingQuestions);
    console.log(questions);
    if (loadingQuestions) { return 'loading'; }
    return (
      <div>
        {}
        <button
          type="button"
          onClick={ this.onClick }
        >
          Próxima pergunta
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(getQuestionThunk(token)),
});

const mapStateToProps = (state) => ({
  token: state.game.token,
  questions: state.game.questions,
  loadingQuestions: state.game.loadingQuestions,
  loadingToken: state.game.loadingToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
