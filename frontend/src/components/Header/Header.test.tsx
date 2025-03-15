/* eslint-disable react/react-in-jsx-scope */
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('should contains text', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Flatirons Front')).toBeInTheDocument();
  });

  it('should contains logo', () => {
    const { getByRole } = render(<Header />);
    expect(getByRole('logo')).toBeInTheDocument();
  });
});
