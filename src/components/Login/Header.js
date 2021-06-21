import React from 'react';
import { Link } from 'react-router-dom';
import trivia from '../../img/Trivia.svg';
import gear from '../../img/gear.png';
import styles from '../../pages/login.module.css';

export default function Header() {
  return (
    <header className={ styles.login_header }>
      <div className={ styles.login_header__logo }>
        <Link to="/">
          <img src={ trivia } alt="trivia" />
        </Link>
      </div>
      <nav className={ styles.login_header__nav }>
        <Link to="/Settings">
          <button type="button" data-testid="btn-settings">
            <img src={ gear } alt="settings" />
          </button>
        </Link>
      </nav>
    </header>
  );
}
