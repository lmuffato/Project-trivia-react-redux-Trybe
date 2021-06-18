import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const Rate = 3;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          {assertions >= Rate ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
