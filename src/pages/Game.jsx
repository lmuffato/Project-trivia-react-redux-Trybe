import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';
import '../CSS/Game.css';

export default class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <Questions />
      </>
    );
  }
}
