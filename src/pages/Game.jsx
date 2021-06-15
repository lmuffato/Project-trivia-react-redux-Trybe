import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import Questions from '../components/Questions';
import { getQuestion } from '../actions';

class Game extends Component {
  render() {
    const { isLoading } = this.props;
    return (
      <div>
        {!isLoading ? <Questions /> : 'carregando....'}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => dispatch(getQuestion(token)),
});

const mapStateToProps = (state) => ({
  isLoading: state.gameData.isLoading,
});

Game.propTypes = {
  isLoading: bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
