import React, { Component } from 'react';
import styles from '../../pages/game.module.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className={ styles.question__footer }>
        <p>
          Desenvolvido por
          {' '}
          <a href="https://github.com/AndersonNascimentoAFSN">Anderson Nascimento</a>
          {', '}
          <a href="https://github.com/Derik-tech">Derik</a>
          {', '}
          <a href="https://github.com/Rodrigolrech">Rodrigo Rech</a>
          {', '}
          <a href="https://github.com">Luiz Vaccari</a>
          .
        </p>
      </footer>
    );
  }
}
