import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApiQuestionsThunk } from '../actions';

class Categoria extends Component {
  render() {
    const { results, questionNumber } = this.props;
    return (
      <>
        <h1>Answer the right question: </h1>
        <div>
          {results.map((result, index) => (
            <div type="submit" key={ index }>
              { index === questionNumber ? `Categoria: ${result.category}` : '' }
            </div>))}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getThunk: (state) => dispatch(getApiQuestionsThunk(state)),
});

const mapStateToProps = (state) => ({
  results: state.game.questions,
  isLoading: state.game.isLoading,
  questionNumber: state.game.questionNumber,
});

Categoria.propTypes = {
  results: PropTypes.string.isRequired,
  questionNumber: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categoria);
