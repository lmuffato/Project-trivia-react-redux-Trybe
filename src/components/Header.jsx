import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as api from '../services/Api';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gravatar: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    api.fetchGravatar(email).then((gravatar) => this.setState({ gravatar }));
  }

  render() {
    const { name, score } = this.props;
    const { gravatar } = this.state;
    return (
      <>
        <img
          src={ gravatar }
          alt="User"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{score}</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.tokenReducer.name,
});

Header.propTypes = {
  gravatar: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
