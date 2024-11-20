
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders JSON editor and form generator', () => {
    expect(screen.getByText(/JSON Editor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/JSON Editor/i)).toBeInTheDocument(); // Check for textarea
  });

  test('validates JSON input', () => {
    const textarea = screen.getByLabelText(/JSON Editor/i);
    fireEvent.change(textarea, { target: { value: '{"formTitle":"Test"}' } });
    expect(screen.queryByText(/Invalid JSON/i)).not.toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: '{"formTitle": "Test"' } });
    expect(screen.getByText(/Invalid JSON/i)).toBeInTheDocument();
  });

  test('updates form in real-time', () => {
    const textarea = screen.getByLabelText(/JSON Editor/i);

    fireEvent.change(textarea, { target: { value: '{"formTitle":"New Title","fields":[]}' } });
    expect(screen.getByText(/New Title/i)).toBeInTheDocument();
  });
});
