import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  points: state.player.score,
  gravatar: state.player.gravatar,
  name: state.player.name,
});

Ranking.propTypes = {
  points: PropTypes.number,
  gravatar: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Ranking);
