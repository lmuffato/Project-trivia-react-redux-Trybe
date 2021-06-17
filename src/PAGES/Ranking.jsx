import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    const playerString = localStorage.getItem('state');
    const player = JSON.parse(playerString);
    console.log(player);
    return (
      <div>oi</div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatar: state.PlayerReducer.gravatar,
});

Ranking.propTypes = {};

export default connect(mapStateToProps, null)(Ranking);
