import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Trivia from '../components/Trivia';
// import user from '../reducers/user';

class Game extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   email: '',
    // };
    this.renderHeader = this.renderHeader.bind(this);
    this.renderName = this.renderName.bind(this);
    this.renderScore = this.renderScore.bind(this);
  }

  renderHeader() {
    return (
      <img
        src=""
        alt="gravatar"
        data-testid="header-profile-picture"
      />
    );
  }

  renderName() {
    const { userName } = this.props;
    return (
      <h1
        data-testid="header-player-name"
      >
        {userName}
      </h1>
    );
  }

  renderScore() {
    return (
      <h1
        data-testid="header-score"
      >
        0
      </h1>
    );
  }

  render() {
    return (
      <>
        <header>
          {this.renderHeader()}
          {this.renderName()}
          {this.renderScore()}
        </header>
        <main>
          <Trivia />
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.name,
  // userEmail: state.email,
});

Game.propTypes = {
  userName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Game);
