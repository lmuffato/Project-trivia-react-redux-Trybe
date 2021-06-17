import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { addRank } from '../redux/actions';

class Feedback extends Component {
  render() {
    const { assertations, ranking, score, gravatar, name } = this.props;
    const minHits = 3;
    const playerInfo = { score, gravatar, name };
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertations < minHits ? 'Podia ser melhor...' : 'Mandou bem!'}
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => ranking(playerInfo) }
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  hits: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertations: state.player.assertations,
  gravatar: state.player.gravatar,
  name: state.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  ranking: (infos) => dispatch(addRank(infos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
