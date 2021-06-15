import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { points } = this.props;
    return (
      <header>
        
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  points: state.player.score,
});

// Ranking.propTypes = {

// };

export default connect(mapStateToProps, null)(Ranking);
