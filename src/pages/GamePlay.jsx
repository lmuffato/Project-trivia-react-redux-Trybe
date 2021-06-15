import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

class GamePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    const { token, fecthQuestionsAction } = this.props;
    fecthQuestionsAction(token);
  }

  renderBooleanQuestion(question) {
    return (
      <div>
        Pergunta booleana
      </div>
    );
  }

  renderMultipleQuestion(question) {
    return (
      <div>
        Pergunta multipla escoha
      </div>
    );
  }

  renderQuestions() {
    const { questions } = this.props;
    return (
      <p>
        {
          questions.map((e) => (e.type === 'boolean'
            ? this.renderBooleanQuestion(e) : this.renderMultipleQuestion(e)))
        }
      </p>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <main>
        <section>
          { loading ? 'Loading' : this.renderQuestions() }
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
  questions: state.triviaReducer.questions,
  loading: state.triviaReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fecthQuestionsAction: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay);
