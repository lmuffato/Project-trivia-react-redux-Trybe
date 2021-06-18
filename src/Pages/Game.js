import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from '../components/Question';
import { fetchQuestionsAC } from '../actions';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.handleIncrementIndex = this.handleIncrementIndex.bind(this);

    this.state = {
      loading: true,
      questionIndex: 0,
    };
  }

  componentDidMount() {
    const { getQuestionsFromAPI } = this.props;
    const time = 1500;
    setTimeout(() => {
      getQuestionsFromAPI()
        .then(() => {
          this.setState({
            loading: false,
          });
        });
    }, time);
  }

  handleIncrementIndex() {
    this.setState((previousState) => ({
      questionIndex: previousState.questionIndex + 1,
    }));
  }

  render() {
    const { questionsFromStore } = this.props;
    const { loading, questionIndex } = this.state;

    return (
      <div>
        <Header />
        {loading
          ? 'Carregando...'
          : (
            <Question
              index={ this.handleIncrementIndex }
              currentQuestion={ questionsFromStore[questionIndex] }
            />)}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestionsFromAPI: () => dispatch(fetchQuestionsAC()),
});

const mapStateToProps = (state) => ({
  questionsFromStore: state.questionsReducer.questions.results,
});

Game.propTypes = {
  getQuestionsFromAPI: PropTypes.func,
  questionsFromStore: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
