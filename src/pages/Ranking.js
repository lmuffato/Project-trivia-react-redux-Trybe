import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/Api';

class Ranking extends React.Component {
  constructor() {
    super();
    this.ranking = this.ranking.bind(this);
    this.state = {
      gravatar: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    api.fetchGravatar(email).then((gravatar) => this.setState({ gravatar }));
  }

  render() {
    const { name } = this.props;
    const { gravatar } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <img
          src={ gravatar }
          alt="User"
          data-testid="ranking-profile-picture"
        />
        <p data-testid={`player-name-${0}`}>{ name }</p>
        <p data-testid={ `player-score-${0}` }>0</p>
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

export default Ranking;
