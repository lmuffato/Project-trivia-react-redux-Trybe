import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends React.Component {
  componentDidUpdate() {
    const { token } = this.props;
    console.log(token);
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    return (
      <div>
        PAGINA DO JOGO
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.gameReducer.token,
});

Game.propTypes = {
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Game);
