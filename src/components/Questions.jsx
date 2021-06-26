import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles.css';
import SingleQuestion from './SingueQuestion';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };

    this.callNext = this.callNext.bind(this);
  }

  componentDidUpdate() {
    console.log('Componente pai montou');
  }

  callNext() {
    const { index } = this.state;
    const { history } = this.props;
    const next = 1;
    const maxIndex = 4;
    if (index < maxIndex) {
      this.setState({
        index: index + next,
      });
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { index } = this.state;
    const { updateScore, history } = this.props;
    return (
      <div>
        <SingleQuestion
          history={ history }
          index={ index }
          callNext={ this.callNext }
          updateScore={ updateScore }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions.results,
  loading: state.questions.loading,
});

export default connect(mapStateToProps, null)(Questions);

// Questions.defaultProps = {
//   questions: [],
// };

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  updateScore: PropTypes.number.isRequired,
  // questions: PropTypes.shape(Object),
};