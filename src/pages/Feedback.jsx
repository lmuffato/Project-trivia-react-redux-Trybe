import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Header from '../components/Header';
import FeedbackMsg from '../components/FeedbackMsg';
import FeedbackResults from '../components/FeedbackResults';
import { lastQuestion } from '../redux/actions/actions';
import './Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    const { setRedirect } = this.props;
    setRedirect(false);
  }

  render() {
    return (
      <div className="feedback-container">
        <Header />
        <div className="feedback">
          <FeedbackMsg />
          <FeedbackResults />
        </div>
        <div className="btn-play-again">
          <Link
            to="/"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </Link>
        </div>
        <div className="btn-ranking">
          <Link
            to="/ranking"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setRedirect: (redirect) => dispatch(lastQuestion(redirect)),
});

Feedback.propTypes = {
  setRedirect: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Feedback);
