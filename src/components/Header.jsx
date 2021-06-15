import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Gravatar: {},
      score: 0,
    };
    this.convertEmailtoHash = this.convertEmailtoHash.bind(this);
  }

  componentDidMount() {
    this.convertEmailtoHash();
  }

  convertEmailtoHash() {
    const { getEmail: { email } } = this.props;
    const get = md5(email).toString();
    this.setState({ Gravatar: get });
  }

  render() {
    const { Gravatar, score } = this.state;
    const { getEmail: { name } } = this.props;
    return (
      <section>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${Gravatar}` }
            alt="Avatar"
          />
          <h3 data-testid="header-player-name">{name}</h3>
          <h1 data-testid="header-score">{score}</h1>

        </header>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  getEmail: state.PlayerReducer,
});

Header.propTypes = {
  getEmail: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Header);
