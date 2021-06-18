import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import styles from '../pages/game.module.css';

class Header extends Component {
  constructor() {
    super();

    this.updateState = this.updateState.bind(this);

    this.state = {
      name: '',
      img: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const emailConvert = md5(email).toString();
    this.updateState(emailConvert);
  }

  updateState(email) {
    const { name } = this.props;
    this.setState({
      name,
      img: email,
    });
  }

  render() {
    const { img, name } = this.state;
    return (
      <div className={ styles.login_header__wrapper }>
        <header className={ styles.questions__header }>
          <img className={ styles.questions__header__avatar } src={ `https://www.gravatar.com/avatar/${img} ` } alt="avatar" data-testid="header-profile-picture" />
          <h2
            data-testid="header-player-name"
            className={ styles.questions__header__title }
          >
            { name }
          </h2>
          <p
            data-testid="header-score"
            className={ styles.questions__header__score }
          >
            0
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.playerReducer.email,
  name: state.playerReducer.name,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
