import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, string, number } from 'prop-types';
import '../styles/feedBack.css';
import Header from '../components/Header';
import PlayAgain from '../components/Buttons/PlayAgain';
import ShowRank from '../components/Buttons/ShowRank';
import DisplayPerformance from '../components/Buttons/DisplayPerformance';

class FeedBack extends Component {
  constructor() {
    super();

    this.setLocalStorage = this.setLocalStorage.bind(this);
  }

  componentDidMount() {
    this.setLocalStorage();
  }

  setLocalStorage() {
    const { player } = this.props;
    const { name, score } = player;
    const saveNewPlayerRank = {
      name,
      score,
    };
    const rankingStorage = JSON.parse(localStorage.getItem('ranking') || '[]');
    rankingStorage.push(saveNewPlayerRank);
    localStorage.setItem('ranking', JSON.stringify(rankingStorage));
  }

  render() {
    const { history, player: { assertions, score } } = this.props;
    return (
      <div className="header-feedback">
        <Header />
        <DisplayPerformance assertions={ assertions } score={ score } />
        <PlayAgain history={ history } />
        <ShowRank history={ history } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

FeedBack.propTypes = {
  player: shape({
    assertions: number,
    gravatarEmail: string,
    name: string,
    score: number,
  }),
}.isRequired;

export default connect(mapStateToProps)(FeedBack);
