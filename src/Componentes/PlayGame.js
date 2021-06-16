import React from 'react';
import { requestTrivia } from '../Api';

class PlayGame extends React.Component {
  constructor() {
    super();
    this.state = {
      pergunta: '',
    };

    this.fetchApiTrivia = this.fetchApiTrivia.bind(this);
  }

  componentDidMount() {
    const token = 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6';
    const number = 5;
    this.fetchApiTrivia(number, token);
  }

  async fetchApiTrivia(quant, token) {
    const dataTrivia = await requestTrivia(quant, token);
    this.setState({
      pergunta: dataTrivia,
    });
  }

  render() {
    const { pergunta } = this.state;
    return (
      <div>
        Game
        {pergunta}
      </div>
    );
  }
}

export default PlayGame;
