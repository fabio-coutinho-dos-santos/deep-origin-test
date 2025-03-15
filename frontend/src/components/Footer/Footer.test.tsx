import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('should show the footer dafault text', () => {
    render(<Footer />);
    expect(screen.getByText('Developed by Fábio Coutinho | All rights reserved')).toBeInTheDocument();
  });
});
