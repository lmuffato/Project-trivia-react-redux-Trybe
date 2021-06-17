import React from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      shouldRedirect: false,
    };
  }

  handleClick() {
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { shouldRedirect } = this.state;
    const ranking = JSON.parse(localStorage.ranking);
    if (shouldRedirect) return <Redirect to="/" />;
    return (
      <div data-testid="ranking-title">
        <ol>
          {ranking.map((player, index) => (
            <li key={ index }>
              <img src={ `https://www.gravatar.com/avatar/${player.token}` } alt={ player.name } />
              <h2 data-testid={ `player-name-${index}` }>{ player.name }</h2>
              <h3 data-testid={ `player-score-${index}` }>{ player.score }</h3>
            </li>
          ))}
        </ol>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
        >
          Tela inicial
        </button>
      </div>
    );
  }
}

export default Ranking;
