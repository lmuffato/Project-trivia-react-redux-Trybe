import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.updateState = this.updateState.bind(this);
    this.getScore = this.getScore.bind(this);

    this.state = {
      name: '',
      img: '',
      score: 0,
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const emailConvert = md5(email).toString();
    this.updateState(emailConvert);
  }

  componentDidUpdate() {
    this.getScore();
  }

  getScore() {
    const { score } = this.props;
    this.setState({
      score,
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
    const { img, name } = this.state;
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${img} ` } alt="avatar" data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <p data-testid="header-score">{ this.state.score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.playerReducer.email,
  name: state.playerReducer.name,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
