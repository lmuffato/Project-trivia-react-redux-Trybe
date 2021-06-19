import React, { Component } from 'react';
import styles from '../../pages/game.module.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className={ styles.question__footer }>
        <span>Desenvolvido e mantido por...</span>
      </footer>
    );
  }
}
