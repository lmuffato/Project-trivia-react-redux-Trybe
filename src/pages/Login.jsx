import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

class Login extends Component {
  render() {
    return (
      <div>
        <LoginForm history={this.props.history} />
      </div>
    );
  }
}

export default Login;
