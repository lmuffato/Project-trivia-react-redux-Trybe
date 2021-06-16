import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    const { picture } = this.props;
    const { name, score, index } = JSON.parse(localStorage.getItem('state')).player;
    localStorage.setItem('ranking', JSON.stringify(
      {
        name,
        score,
        picture,
      },
    ));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          <li>
            <img
              src={ picture }
              alt="User"
              data-testid="ranking-profile-picture"
            />
            <p data-testid={ `player-name-${index}` }>{ name }</p>
            <p data-testid={ `player-score-${index}` }>{ score }</p>
          </li>
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
