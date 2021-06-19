import React, { Component } from 'react';
import UserData from '../components/UserData';

class Feedback extends Component {
  render() {
    return (
      <div>
        <UserData />
        <h4 data-testid="feedback-text"> Feedback page </h4>
      </div>
    );
  }
}

export default Feedback;
