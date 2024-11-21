import { render, screen, fireEvent } from '@testing-library/react';
import FooterButton from '../../components/FooterButton';
import { vi } from 'vitest';

test('renders FooterButton with label', () => {
  render(<FooterButton label="Test Button" onClick={() => {}} />);
  const buttonElement = screen.getByText(/Test Button/i);
  expect(buttonElement).toBeInTheDocument();
});

test('calls onClick when button is clicked', () => {
  const handleClick = vi.fn();
  render(<FooterButton label="Get me out of here" onClick={handleClick} />);
  const button = screen.getByText('Get me out of here');
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});