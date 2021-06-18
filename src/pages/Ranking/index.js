import React from 'react';
import { Link } from 'react-router-dom';
import LowerRanking from './LowerRanking';
import TopRanking from './TopRanking';

export default function Ranking() {
  return (
    <div>
      <TopRanking />
      <LowerRanking />
      <Link to="/login">
        <input
          value="Go Home"
          data-testid="btn-go-home"
          type="button"
        />
      </Link>
    </div>
  );
}
