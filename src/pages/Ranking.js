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
          <li
            key={ i }
            className="list-unstyled row p-3 text-center justify-content-center"
          >
            <img
              style={ { width: '150px' } }
              src={ picture }
              alt="User"
              data-testid="ranking-profile-picture"
            />
            <p
              className="display-4 col"
              data-testid={ `player-name-${index}` }
            >
              { name }
            </p>
            <p
              className="display-4 col"
              data-testid={ `player-score-${index}` }
            >
              { score }
            </p>
          </li>
        );
      }));
  }

  render() {
    return (
      <div className="container d-grid gap-4 p-3 text-white">
        <div>
          <h1
            data-testid="ranking-title"
            className="display-2 row justify-content-center"
          >
            Ranking
          </h1>
        </div>
        <div className="container d-grid p-3">
          <ul>
            { this.rankingMap(this.rankingSort()) }
          </ul>
        </div>
        <div className="input-group justify-content-center">
          <Link to="/">
            <button
              className="btn btn-secondary row"
              data-testid="btn-go-home"
              type="button"
            >
              Voltar para tela inicial
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  picture: state.tokenReducer.picture,
});

export default connect(mapStateToProps, null)(Ranking);
