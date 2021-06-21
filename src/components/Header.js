import React from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  componentDidMount() {
    const { email } = this.props;
    const hash = md5(email);
    document.querySelector('#image').src = `https://www.gravatar.com/avatar/${hash}.jpg`;
  }

  render() {
    const { name, score, isLoading } = this.props;
    if (isLoading) return 'carregando';
    return (
      <header>
        <img src="" id="image" alt={ name } data-testid="header-profile-picture" />
        <h4 data-testid="header-player-name">{ name }</h4>
        <h4 id="score" data-testid="header-score">{ score }</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.questions.score,
  image: state.user.image,
  isLoading: state.user.isLoading,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Header);
