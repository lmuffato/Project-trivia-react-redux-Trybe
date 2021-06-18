import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Header from '../components/Header';
import FeedbackMsg from '../components/FeedbackMsg';
import FeedbackResults from '../components/FeedbackResults';
import { lastQuestion } from '../redux/actions/actions';

class Feedback extends Component {
  componentDidMount() {
    const { setRedirect } = this.props;
    setRedirect(false);
  }

  render() {
    return (
      <div>
        <Header />
        <FeedbackMsg />
        <FeedbackResults />
        <Link
          to="/"
          data-testid="btn-play-again"
        >
          Jogar novamente
        </Link>
        <Link
          to="/ranking"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </Link>
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
