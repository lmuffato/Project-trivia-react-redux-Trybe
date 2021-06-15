import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Play extends Component {
  render() {
    return (
      <main>
        Play
      </main>
    );
  }
}

// Play.propTypes = {

// };
const mapStateToProps = (state) => ({
  questions: state.player.questions,
});

mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
