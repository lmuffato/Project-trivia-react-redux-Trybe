import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.updateState = this.updateState.bind(this);

    this.state = {
      name: '',
      img: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const emailConvert = md5(email).toString();
    this.updateState(emailConvert);
  }

  updateState(email) {
    const { name } = this.props;
    this.setState({
      name,
      img: email,
    });
  }

  render() {
    const { img, name } = this.state;
    console.log(name);
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${img} ` } alt="avatar" data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.playerReducer.email,
  name: state.playerReducer.name,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
