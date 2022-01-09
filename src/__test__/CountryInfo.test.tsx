import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryInfo from '../components/pages/CountryInfo';
import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';
test('renders country info component', () => {
    const history = createMemoryHistory()

    history.push(`/exam/:name`)

  render(
  <Router history={history}>
  <CountryInfo />
  </Router>
  );

  const countryInfo = screen.getByTestId('countryInfo');
  expect(countryInfo).toBeInTheDocument();
});
