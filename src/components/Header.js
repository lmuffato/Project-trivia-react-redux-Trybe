import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import styles from '../pages/game.module.css';

class Header extends Component {
  constructor() {
    super();

    this.updateState = this.updateState.bind(this);
    this.getScore = this.getScore.bind(this);

    this.state = {
      name: '',
      img: '',
      scoreHeader: 0,
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const emailConvert = md5(email).toString();
    this.updateState(emailConvert);
  }

  componentDidUpdate() {
    const { score } = this.props;
    const { scoreHeader } = this.state;
    if (score !== scoreHeader) {
      this.getScore();
    }
  }

  getScore() {
    const { score } = this.props;
    this.setState({
      scoreHeader: score,
    });
  }

  updateState(email) {
    const { name } = this.props;
    this.setState({
      name,
      img: email,
    });
  }

  render() {
    const { img, name, scoreHeader } = this.state;
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
            { scoreHeader }
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.playerReducer.email,
  name: state.playerReducer.name,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
