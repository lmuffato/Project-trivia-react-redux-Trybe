import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.getHash = this.getHash.bind(this);
    this.state = {
      gravatarUrl: '',
    };
  }

  componentDidMount() {
    this.getHash();
  }

  async getHash() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({ gravatarUrl: `https://www.gravatar.com/avatar/${hash}` });
  }

  render() {
    const { name, score } = this.props;
    const { gravatarUrl } = this.state;
    return (
      <header>
        <div>
          <img
            src={ gravatarUrl }
            alt={ `Imagem de ${name}` }
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">{score}</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
