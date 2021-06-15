import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuestCard from '../components/QuestCard';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.loading = this.loading.bind(this);
  }

  loading() {
    return <h1> Loading </h1>;
  }

  render() {
    const { questions } = this.props;
    return (
      <section>
        { questions === '' ? this.loading() : <QuestCard question={ questions[0] } /> }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.login.questions,
});

GameScreen.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(GameScreen);
