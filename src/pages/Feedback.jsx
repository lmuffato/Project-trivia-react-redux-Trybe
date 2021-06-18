import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/storage';
import { reset, timeIn } from '../actions';

class Feedback extends Component {
  constructor() {
    super();
    this.saveInfoPlayer = this.saveInfoPlayer.bind(this);
    this.orderArrayByScore = this.orderArrayByScore.bind(this);
  }

  componentDidMount() {
    this.saveInfoPlayer();
  }

  componentWillUnmount() {
    const { init, restart } = this.props;
    init();
    restart();
  }

  orderArrayByScore(a, b) {
    const positionInArray = -1;
    if (a.score < b.score) {
      return 1;
    } if (a.score > b.score) return positionInArray;
    return b;
  }

  saveInfoPlayer() {
    const { name, score, gravatarEmail } = this.props;
    const currUser = {
      name,
      score,
      gravatarEmail,
    };
    const firstUser = [];
    if (!localStorage.ranking) {
      setToLocalStorage('ranking', firstUser);
    }
    const currUserlocal = getItemFromLocalStorage('ranking');
    const orderArray = currUserlocal.concat(currUser).sort(this.orderArrayByScore);
    setToLocalStorage('ranking', orderArray);
  }

  render() {
    const { player } = getItemFromLocalStorage('state');
    const { assertions, score } = player;
    const minCorrect = 3;
    return (
      <div>
        <h2>Feedback</h2>
        <Header />
        <p
          data-testid="feedback-text"
        >
          {assertions >= minCorrect ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <p>
          Você acertou
          <spam> </spam>
          <spam data-testid="feedback-total-question">{ assertions }</spam>
          <spam> </spam>
          perguntas.
        </p>
        <p>
          E somou
          <spam> </spam>
          <spam data-testid="feedback-total-score">{ score }</spam>
          <spam> </spam>
          pontos
        </p>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver ranking</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, score, gravatarEmail } }) => ({
  name,
  score,
  gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  init: () => dispatch(timeIn()),
  restart: () => dispatch(reset()),
});

Feedback.propTypes = {
  name: Proptypes.string,
  score: Proptypes.number,
  gravatarEmail: Proptypes.string,
  init: Proptypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
