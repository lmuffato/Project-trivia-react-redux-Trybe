import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/storage';

class Feedback extends Component {
  constructor() {
    super();
    this.saveInfoPlayer = this.saveInfoPlayer.bind(this);
  }

  componentDidMount() {
    this.saveInfoPlayer();
  }

  saveInfoPlayer() {
    const { name, score, gravatarEmail } = this.props;
    const currUser = {
      name,
      score,
      gravatarEmail,
    };
    const firstUser = [];
    if (!localStorage.ranking) {
      setToLocalStorage('ranking', firstUser);
    }
    const currUserlocal = getItemFromLocalStorage('ranking');
    setToLocalStorage('ranking', [...currUserlocal, { ...currUser }]);
  }

  render() {
    return (
      <div>
        <h2 data-testid="feedback-text">Feedback</h2>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, score, gravatarEmail } }) => ({
  name,
  score,
  gravatarEmail,
});

Feedback.propTypes = {
  name: Proptypes.string,
  score: Proptypes.number,
  gravatarEmail: Proptypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
