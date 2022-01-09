import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/pages/Home';


test('renders home component', () => {
  render(<Home />);
  const home = screen.getByTestId('home');
  expect(home).toBeInTheDocument();
});
