import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">FeedBack text to be put on here</p>
        <h2 data-testid="ranking-title">Valor</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  points: state.player.score,
  gravatar: state.player.gravatar,
  name: state.player.name,
});

Ranking.propTypes = {
  points: PropTypes.number,
  gravatar: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Ranking);