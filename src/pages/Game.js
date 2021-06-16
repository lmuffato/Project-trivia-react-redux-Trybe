import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import { fetchAPIThunk, timeOut } from '../actions/index';
import Timer from '../components/Timer';
import RenderQuestions from '../components/RenderQuestions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      // score: 0,
    };
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  render() {
    const { isLoading } = this.props;
    const { questionNumber } = this.state;
    if (isLoading) return <h2>Loading...</h2>;
    return (
      <div>
        <Header />
        <span>
          Tempo:
          <Timer />
          segundos
        </span>
        <RenderQuestions question={ questionNumber } />
        <button type="button">PRÓXIMA</button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAPIThunk()),
  timeOut: () => dispatch(timeOut()),
});

const mapStateToProps = ({ apiResponse: { isLoading } }) => ({
  isLoading,
});

Game.propTypes = {
  fetchAPI: Proptypes.func.isRequired,
  isLoading: Proptypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
