import React, { Component } from 'react';
import { connect } from 'react-redux';


class Questions extends Component {
  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        {questions === undefined ? <p>vazio</p> : questions.map((question) => <p>{question.question}</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions.results,
});

export default connect(mapStateToProps, null)(Questions);
