// tela perguntas em si
// utiliza header component

// Requisição API

import React from 'react';
import Header from '../components/Header';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const token = '834e8c8f0e1b1b61f853b673ee0743749c2409685e44b211bb9657f5919e8c17';
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(endpoint);
    const data = await request.json();
    console.log(data);
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default GamePage;
