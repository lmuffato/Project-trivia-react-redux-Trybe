import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { resetScore } from '../actions';
// // import md5 from 'crypto-js';

class Ranking extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { resetPlayerScore } = this.props;
    resetPlayerScore();
  }

  render() {
    const renderRanking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <h1 data-testid="ranking-title"> RANKING</h1>
        <ol>
          {renderRanking.map((ranking, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>
                { ranking.name }
              </p>
              <span data-testid={ `player-score-${index}` }>
                { ranking.score }
              </span>
              <div>
                <img src={ ranking.picture } alt="user" />
              </div>
            </li>
          ))}
        </ol>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ this.handleClick }
          >
            Início
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  resetPlayerScore: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   score: state.userReducer.score,
//   user: state.userReducer.user,
//   image: state.userReducer.image,
// });

const mapDispatchToProps = (dispatch) => ({
  resetPlayerScore: () => dispatch(resetScore()),
});

export default connect(null, mapDispatchToProps)(Ranking);
