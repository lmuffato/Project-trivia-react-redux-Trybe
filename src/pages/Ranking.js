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
          <li key={ i } className="list-unstyled row">
            <img
              style={ { width: '150px' } }
              src={ picture }
              alt="User"
              data-testid="ranking-profile-picture"
            />
            <p
              className="display-6 col"
              data-testid={ `player-name-${index}` }
            >
              { name }

            </p>
            <p className="display-6 col " data-testid={ `player-score-${index}` }>{ score }</p>
          </li>
        );
      }));
  }

  render() {
    return (
      <div className="container">
        <h1
          data-testid="ranking-title"
          className="h1 row justify-content-center"
        >
          Ranking
        </h1>
        <ul>
          { this.rankingMap(this.rankingSort()) }
        </ul>
        <div className="justify-content-center">
          <Link to="/">
            <button
              className="btn btn-primary row"
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
