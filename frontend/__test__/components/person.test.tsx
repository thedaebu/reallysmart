import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Person from '../../person';

test('renders a name', () => {
    render(<Person name="Jack " />)
    const divElement = screen.getByRole("contentinfo")
    expect(divElement).toHaveTextContent("Name is Jack");
    expect(divElement).toHaveAttribute("role", "contentinfo")
})