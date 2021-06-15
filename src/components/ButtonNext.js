// Referencia para estre trecho do código https://www.ti-enxame.com/pt/javascript/numero-aleatorio-usando-react.js/833492496/
import React from 'react';

class buttonNext extends React.Component {
  constructor() {
    super();
    this.state = { random: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { random } = this.state;
    const min = 0;
    const max = 4;
    const rand = min + math.random() * (max - min);
    this.setState({ random: random + rand });
  }

  render() {
    const { random } = this.state;
    return (
      <div>
        <button type="submit" onClick={ this.handleClick }>
          Proxima
        </button>
        { random }
      </div>
    );
  }
}

export default buttonNext;
