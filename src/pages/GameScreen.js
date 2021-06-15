import React from 'react';
import { connect } from 'react-redux';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {},
    };
    this.mockApi = this.mockApi.bind(this);
  }

  componentDidMount() {
    this.mockApi();
  }

  async mockApi() {
    let { APItoken } = this.props;
    APItoken = '9965ae223e2bc65f25134bb13e3f99045e0df2d2b668450da4a676fe8b8e898a';
    const getAPIQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${APItoken}`);
    const questions = await getAPIQuestions.json();
    this.setState({ questions });
  }

  render() {
    return (
      <section>
        offline
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  APItoken: state.login.token.token,
});

export default connect(mapStateToProps, null)(GameScreen);
