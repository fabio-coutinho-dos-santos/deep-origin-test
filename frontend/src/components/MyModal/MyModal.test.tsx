import MyModal from "./MyModal";
import { render, screen } from '@testing-library/react';

describe('MyModal component', () => {
  const props = {
    image: 'test-image.jpg',
    show: true,
    onHide: (()=>{}) ,
    children: 'Test Content',
    title: 'Test Title',
  };

  test('renders MyModal component correctly', () => {
    render(<MyModal {...props} />);
    
    // Assert that the modal is rendered with the provided props
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', props.image);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ok' })).toBeInTheDocument();
  });
});