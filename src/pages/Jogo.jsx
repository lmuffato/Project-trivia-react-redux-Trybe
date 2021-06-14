import React, { Component } from 'react';
import { getQuestions } from '../services/triviaAPI';

export default class Jogo extends Component {
  render() {
    console.log(getQuestions());
    return (
      <div>
        <h1>Página do Jogo</h1>
      </div>
    );
  }
}
