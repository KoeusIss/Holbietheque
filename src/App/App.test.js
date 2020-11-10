import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router';

import App from './index'

describe('App', function () {
  it('renders App component', () => {
    render(<App/>, {wrapper: MemoryRouter})
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
});
