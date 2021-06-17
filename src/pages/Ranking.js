import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  rankingSort() {
    const magicOne = -1;
    const dataRanking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = dataRanking.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } if (a.score > b.score) {
        return magicOne;
      }
      return 0;
    });
    return sortRanking;
  }

  rankingMap(arr) {
    return (
      arr.map((e, i) => {
        const { name, score, index, picture } = e;
        return (
          <li key={ i }>
            <img
              src={ picture }
              alt="User"
              data-testid="ranking-profile-picture"
            />
            <p data-testid={ `player-name-${index}` }>{ name }</p>
            <p data-testid={ `player-score-${index}` }>{ score }</p>
          </li>
        );
      }));
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { this.rankingMap(this.rankingSort()) }
        </ul>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Voltar para tela inicial
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  picture: state.tokenReducer.picture,
});

export default connect(mapStateToProps, null)(Ranking);
