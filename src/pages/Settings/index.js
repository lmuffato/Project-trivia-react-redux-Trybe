import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import voltar from '../../images/voltar.png';
import './styles.css';

class Settings extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img className="voltar" src={ voltar } alt="back" />
        </Link>
        <h1 data-testid="settings-title">Configurações</h1>
      </div>
    );
  }
}

export default Settings;
