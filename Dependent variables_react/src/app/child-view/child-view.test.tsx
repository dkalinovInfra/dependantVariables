import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import ChildView from './child-view';
import 'element-internals-polyfill';

test('renders ChildView component', () => {
    const wrapper = render(<ChildView />);
    expect(wrapper).toBeTruthy();
});