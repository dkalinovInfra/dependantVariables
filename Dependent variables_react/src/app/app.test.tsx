import { expect, test, vi } from 'vitest';
import { GlobalContext } from './hooks/context-hooks';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './app';
import 'element-internals-polyfill';

const mockGlobalState: any = {};
const mockSetGlobalState = () => {};

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);


test('renders App component', () => {
  const wrapper = render(
    <GlobalContext.Provider value={{ globalState: mockGlobalState, setGlobalState: mockSetGlobalState }}>
      <App />
    </GlobalContext.Provider>,
    { wrapper: MemoryRouter });
  expect(wrapper).toBeTruthy();
});