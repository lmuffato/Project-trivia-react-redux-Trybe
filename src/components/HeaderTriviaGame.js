import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

const HeaderTriviaGame = (props) => {
  const { user, points = 0 } = props;

  return (
    <div className="header-trivia-game">
      <div>
        <img src={ `https://www.gravatar.com/avatar/${md5(user.email)}` } alt={ user.name } data-testid="header-profile-picture" />
        <label htmlFor="user-name">
          Jogador:
          <span id="user-name" data-testid="header-player-name">{ user.name }</span>
        </label>
      </div>
      <div>
        <span>
          Pontos:
          <span data-testid="header-score">{ points }</span>
        </span>
        <Link to="/settings"><span data-testid="btn-settings">Settings</span></Link>
      </div>
    </div>
  );
};

HeaderTriviaGame.propTypes = {
  user: PropTypes.shape({}),
}.isRequired;

const mapStateToProps = (state) => ({
  user: state.user,
  points: state.points,
});

// const mapDispatchToProps = (dispatch) => ({
// onClick: (ev) => dispatch(answerAction(ev)),
// });

export default connect(mapStateToProps, null)(HeaderTriviaGame);
