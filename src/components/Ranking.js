import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Player from './Player';

class Ranking extends Component {
  constructor(props) {
    super(props);

    const ranking = this.getData();

    this.state = {
      ranking,
    };
  }

  getData() {
    const data = JSON.parse(localStorage.getItem('ranking')).sort((a, b) => b - a);
    return data;
  }

  render() {
    const { ranking } = this.state;
    return (
      <div data-testid="ranking-title">
        <ul>
          {
            ranking.map((item, id) => (
              <li key={ id }>
                <Player
                  index={ id }
                  name={ item.name }
                  score={ item.score }
                  picture={ item.picture }
                />
              </li>
            ))
          }
        </ul>
        <Link to="/" data-testid="btn-go-home">
          Voltar ao inicio
        </Link>
      </div>
    );
  }
}

export default Ranking;
