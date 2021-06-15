import React, { Component } from 'react';
import FeedbackHeader from '../components/FeedbackHeader';
import FeedbackMsg from '../components/FeedbackMsg';
import feedbackResult from '../components/feedbackResult';

export class Feedback extends Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <FeedbackMsg />
        <feedbackResult />
      </div>
    )
  }
}

export default Feedback;
