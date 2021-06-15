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
