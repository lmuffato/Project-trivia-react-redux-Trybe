import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, object } from 'prop-types';
import Questions from '../components/Questions';
import { getQuestion } from '../actions';
import '../styles/header.css';
import Header from '../components/Header';

class Game extends Component {
  componentDidMount() {
    const { requestQuestions } = this.props;
    const token = localStorage.getItem('token');
    requestQuestions(token);
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="main-content">
        <Header />
        <div className="question-main-content">
          {!isLoading ? <Questions /> : 'carregando....'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.gameData.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => dispatch(getQuestion(token)),
});

Game.propTypes = {
  isLoading: bool,
  player: object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
