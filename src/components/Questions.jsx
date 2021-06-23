import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles.css';
import { Redirect } from 'react-router-dom';
import SingleQuestion from './SingueQuestion';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      reset: false,
    };

    this.callNext = this.callNext.bind(this);
  }

  componentDidUpdate() {
    console.log('Componente pai montou');
  }

  callNext() {
    const { index } = this.state;
    const next = 1;
    if (index < 4) {
      this.setState({
        index: index + next,
        reset: false,
      });
    } else {
      return (
        <Redirect to="/ranking" />
      );
    }
  }

  render() {
    const { index } = this.state;
    const { updateScore } = this.props;
    return (
      <div>
        <SingleQuestion index={ index } callNext={ this.callNext } updateScore={ updateScore } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions.results,
  loading: state.questions.loading,
});

export default connect(mapStateToProps, null)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(Object),
  loading: PropTypes.bool.isRequired,
};

Questions.defaultProps = {
  questions: [],
};
