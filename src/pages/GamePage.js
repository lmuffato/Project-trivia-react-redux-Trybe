// tela perguntas em si
// utiliza header component

// Requisição API

import React from 'react';
import Header from '../components/Header';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // category: '',
      // correct_answer: '',
      // incorrect_answers: [],
      // question: '',
    };

    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const token = localStorage.getItem('token');
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
