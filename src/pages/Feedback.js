import React, { Component } from 'react';
import UserData from '../components/UserData';
import UserFeedback from '../components/UserFeedback';

class Feedback extends Component {
  render() {
    return (
      <div>
        <UserData />
        <UserFeedback />
      </div>
    );
  }
}

export default Feedback;
