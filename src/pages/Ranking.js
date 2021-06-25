import React, { Component } from 'react';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      name: 'teste',
    };
  }

  render() {
    const { name } = this.state;
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title">{ name }</h1>
      </div>
    );
  }
}

export default Ranking;
