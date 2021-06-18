import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const { ranking } = this.props;
    console.log('play', ranking);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking: </h1>
        <br />
        <h3>Melhores colocados (em ordem decrescente): </h3>
        <ul>
          {ranking.map((player, index) => (
            <>
              <img src={ player.gravatar } alt="foto" />
              <li
                key={ index }
                data-testid={ `player-name-${index}` }
              >
                {player.name}
              </li>
              <li>
                {`Acertos: ${player.assertions}`}
              </li>
              <li>
                {`Pontuação: ${player.score}`}
              </li>
            </>
          ))}
        </ul>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.game.ranking,
});

Ranking.propTypes = {
  ranking: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(Ranking);
