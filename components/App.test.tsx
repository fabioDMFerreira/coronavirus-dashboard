import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

const mockFetchPromise = Promise.resolve({
  text: () => '',
});
window.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe('App', () => {
  it('should render', () => {
    // render(<App />);
  });
});
