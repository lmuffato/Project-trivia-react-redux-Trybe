import React from 'react';
import PropTypes from 'prop-types';
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
    const { userName } = this.props;
    const { gravatar } = this.state;

    return (
      <>
        <img
          src={ gravatar }
          alt="User"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid="header-score">0</p>
      </>
    );
  }
}

Header.propTypes = {
  gravatar: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default Header;
