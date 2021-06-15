import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    // const { nameState, scoreState, imgGravatarState } = this.props;
    const imgGravatarState = 'https://cdn.pixabay.com/photo/2016/04/23/05/58/cat-1347176_960_720.jpg';
    const nameState = 'Gatinho Fofinho';
    const scoreState = 10;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ imgGravatarState }
          alt={ nameState }
          height="70"
          width="80"
        />
        <p data-testid="header-player-name">
          { nameState }
        </p>
        <p data-testid="header-score">
          Score:
          { scoreState }
        </p>
      </header>
    );
  }
}

// Header.propTypes = {
//   nameState: PropTypes.string.isRequired,
//   scoreState: PropTypes.number.isRequired,
//   imgGravatarState: PropTypes.string.isRequired,
// };

// const mapStateProps = (state) => ({
//   imgGravatarState: state.ranking.picture,
//   nameState: state.ranking.name,
//   scoreState: state.ranking.score,
// });

// Fique em dúvida se as informações do state vão vir do player ou da chave ranking

export default connect(null, null)(Header);
