import { expect, test, vi } from 'vitest';
import { GlobalContext } from '../hooks/context-hooks';
import { render } from '@testing-library/react';
import ChildView from './child-view';
import 'element-internals-polyfill';

const mockGlobalState: any = {};
const mockSetGlobalState = () => {};

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);


test('renders ChildView component', () => {
  const wrapper = render(
    <GlobalContext.Provider value={{ globalState: mockGlobalState, setGlobalState: mockSetGlobalState }}>
      <ChildView />
    </GlobalContext.Provider>);
  expect(wrapper).toBeTruthy();
});