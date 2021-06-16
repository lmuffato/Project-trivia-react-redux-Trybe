import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <p>Página não encontrada</p>
      <Link to="/">Login</Link>
    </div>
  );
}
