import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const rankingInfo = localStorage.getItem('ranking');
    const rankingJson = JSON.parse(rankingInfo);
    // const stateInfo = localStorage.getItem('state');
    // const stateJson = JSON.parse(stateInfo);
    const { score } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ rankingJson.picture }
            alt="Foto do Usuario"
          />
          <h3 data-testid="header-player-name">{ rankingJson.name }</h3>
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

export default connect(mapStateToProps, null)(Header);
