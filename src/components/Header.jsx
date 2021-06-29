import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const rankingInfo = localStorage.getItem('ranking');
    const rankingJson = JSON.parse(rankingInfo);
    // const stateInfo = localStorage.getItem('state');
    // const stateJson = JSON.parse(stateInfo);
    console.log(this.props);
    const { score } = this.props;
    console.log(score);
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ rankingJson.picture }
            alt="Foto do Usuario"
          />
          <h3 data-testid="header-player-name">{ `Nome:${rankingJson.name}` }</h3>
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions.results,
  loading: state.questions.loading,
});

Header.propTypes = {
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
