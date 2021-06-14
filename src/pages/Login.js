import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createHash = this.createHash.bind(this);
    this.state = {
      name: '',
      email: '',
      playButton: false,
      emailHash: '',
    };
  }

  validateFields() {
    const { name, email } = this.state;
    const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const playButton = name.length > 0 && regex.test(email);
    this.setState({ playButton });
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => this.validateFields());
  }

  createEmailHash() {
    const { email } = this.state;
    const emailHash = md5(email).toString();
    this.setState({ emailHash });
    this.requestGravatarImg();
  }

  handleClick() {
    this.createHash();
    // const { history } = this.props;
    // history.push('/game');
  }

  render() {
    const { name, email, playButton } = this.state;

    return (
      <div>
        <h1>Tela de login</h1>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          E-mail
          <input
            type="email"
            id="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !playButton }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default connect()(Login);
