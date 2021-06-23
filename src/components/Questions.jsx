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
      reset: false,
    };

  this.callNext = this.callNext.bind(this);
  }

  componentDidUpdate() {
    console.log("Componente pai montou");
  }

  callNext() {
    const { index } = this.state;
    const { history } = this.props; 
    const next = 1;
    if (index < 4) {
      this.setState({
        index: index + next,
        reset: false,
      })
    } else {
      history.push('/feedback');
    
    }
  }

  render() {
    const { index } = this.state;
    const { history } = this.props;
    return (
      <div>
          <SingleQuestion history={history} index={index} callNext={this.callNext}/>
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
