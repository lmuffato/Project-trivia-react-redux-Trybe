import React from 'react';
import { Link } from 'react-router-dom';
import trivia from '../../img/Trivia.svg';
import styles from '../../pages/ranking.module.css';
import home from '../../img/home.png';

export default function Header() {
  return (
    <header className={ styles.ranking__header }>
      <div className={ styles.ranking__header__logo }>
        <Link to="/">
          <img src={ trivia } alt="trivia" />
        </Link>
      </div>
      <nav className={ styles.ranking_header__nav }>
        <Link
          to="/"
          data-testid="btn-go-home"
          className={ styles.ranking__link }
        >
          <img src={ home } alt="go to home" />
        </Link>
      </nav>
    </header>
  );
}
