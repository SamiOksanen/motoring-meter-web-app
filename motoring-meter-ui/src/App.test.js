import { render, screen } from '@testing-library/react';
import App from './App';

test('renders footer', () => {
    render(<App />);
    const footerElement = screen.getByText(/Made by Sami Oksanen/i);
    expect(footerElement).toBeInTheDocument();
});
