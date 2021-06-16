import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, object } from 'prop-types';
import Questions from '../components/Questions';
import { getQuestion } from '../actions';
import '../styles/header.css';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.setLocalStorage = this.setLocalStorage.bind(this);
  }

  componentDidMount() {
    const { requestQuestions } = this.props;
    const token = localStorage.getItem('token');
    requestQuestions(token);
    this.setLocalStorage();
  }

  setLocalStorage() {
    const { player } = this.props;
    const { name, gravatarEmail, assertions, score } = player;
    const state = { player: {
      name,
      assertions,
      score,
      gravatarEmail,
    } };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    const { isLoading, history } = this.props;
    return (
      <div className="main-content">
        <Header />
        <div className="question-main-content">
          {!isLoading ? <Questions history={ history } /> : 'carregando....'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.gameData.isLoading,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => dispatch(getQuestion(token)),
});

Game.propTypes = {
  isLoading: bool,
  player: object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
