import { redirect } from 'react-router-dom';
import ChildView from './child-view/child-view';
export const routes = [
  { index: true, loader: () => redirect('child-view') },
  { path: 'child-view', element: <ChildView />, text: 'Child View' }
];
