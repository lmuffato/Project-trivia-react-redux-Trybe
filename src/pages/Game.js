import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { getQuestions } from '../services/dataApi';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      index: 0,
    };

    this.handleFunc = this.handleFunc.bind(this);
    this.incrementIndex = this.incrementIndex.bind(this);
  }

  componentDidMount() {
    this.handleFunc();
  }

  handleFunc() {
    const { token } = this.props;
    console.log(token);
    return getQuestions(token)
      .then((data) => this.setState({
        questions: data.results,
      }));
  }

  incrementIndex() {
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
  }

  render() {
    const { questions, index } = this.state;
    if (questions.length === 0) return <h2>loading...</h2>;
    return (
      <div>
        <h2 data-testid="question-category">
          {questions[index].category}
        </h2>
        <p data-testid="question-text">
          {questions[index].question}
        </p>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.incrementIndex }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
});

Game.propTypes = {
  token: string,
}.isRequired;

export default connect(mapStateToProps, null)(Game);
