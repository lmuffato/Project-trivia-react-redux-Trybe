import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestQuestion } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.time = this.time.bind(this);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { props: { request } } = this;
    request();
    this.time();
  }

  time() {
    setTimeout(() => this.setState({ loading: false }), 1000);
  }

  render() {
    const { props: { questions } } = this;
    const { state: { loading } } = this;
    console.log(questions);
    return (
      <div>
        {loading ? <p>loading</p> : (
          <>
            <p data-testid="question-category">
              {questions[0].category}
            </p>
            <p data-testid="question-text">
              {questions[0].question}
            </p>
          </>
        )}
      </div>
    );
  }
}

const mapSatateToProps = (state) => ({
  questions: state.questionGame.results,
});

const mapDispatchToProps = () => (dispatch) => ({
  request: () => dispatch(requestQuestion()),
});

export default connect(mapSatateToProps, mapDispatchToProps)(Game);
