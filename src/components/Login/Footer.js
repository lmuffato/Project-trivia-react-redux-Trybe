import React, { Component } from 'react';
import styles from '../../pages/login.module.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className={ styles.login_footer }>
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
