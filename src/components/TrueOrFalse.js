import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import './trueOrfalse.css';

class TrueOrFalse extends Component {
  componentDidMount() {
    const { token, fecthQuestionsAction } = this.props;
    fecthQuestionsAction(token);
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <main className="main-container">
        <section className="question-container">
          <h2>Categoria da Pergunta</h2>
          <p>pergunta</p>
          <p>Tempo</p>
        </section>
        <section className="answers-container">
          <button type="button">True</button>
          <button type="button">False</button>
          <button id="next" type="button">Próxima</button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
  questions: state.triviaReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fecthQuestionsAction: (token) => dispatch(fetchQuestions(token)),
});

TrueOrFalse.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.string.isRequired,
  fecthQuestionsAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrueOrFalse);
