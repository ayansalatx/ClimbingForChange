import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a custom render function that includes providers
export function renderWithProviders(
  ui,
  {
    route = '/',
    theme = createTheme(),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </ThemeProvider>
    );
  }

  // Return an object with all of RTL's query functions and the container
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { renderWithProviders as render };
