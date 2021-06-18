import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import md5 from 'crypto-js';

class Ranking extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.renderLocalStorage = this.renderLocalStorage.bind(this);
  // }

  // renderLocalStorage() {
  //   const renderRanking = JSON.parse(localStorage.getItem('ranking'));
  // }

  render() {
    // const renderRanking = JSON.parse(localStorage.getItem('ranking'));

    const { user, score, image } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title"> RANKING</h1>
        {/* map no renderRanking ? Math.Max() SERÁ? */}
        <p>
          { user }
        </p>
        <p>
          { score }
        </p>
        <img src={ image } alt="user" />
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Início
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  score: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.userReducer.score,
  user: state.userReducer.user,
  image: state.userReducer.image,
});

export default connect(mapStateToProps)(Ranking);
