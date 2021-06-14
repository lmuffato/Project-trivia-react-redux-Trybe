import React from 'react';
import App from './App';
import { renderWithRouterAndStore } from './renderWithRouterAndStore';

test('VAI COMEÇAR, A CYBER LUTAAAAA... ATÉ CAIR! NÃO PERCA O CONTROLE, E AO TOPO VAMOS SUBIR!', () => {
  const { getByText } = renderWithRouterAndStore(<App />);
  const linkElement = getByText(/SUA VEZ/i);
  expect(linkElement).toBeInTheDocument();
});
