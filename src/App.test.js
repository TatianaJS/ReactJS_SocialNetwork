/*
//original version
import { render, screen } from '@testing-library/react';
import SocialNetworkApp from './App';

test('renders learn react link', () => {
  render(<SocialNetworkApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

import SocialNetworkApp from './App';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<SocialNetworkApp />);
  root.unmount();
});