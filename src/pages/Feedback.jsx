import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { history: { location: { state: { hits } } } } = this.props;
    const minHits = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { hits < minHits ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  hits: PropTypes.number,
}.isRequired;

export default Feedback;
