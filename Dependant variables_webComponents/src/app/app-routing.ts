import { Route } from '@vaadin/router';
import './not-found/not-found.js';
import './child-view/child-view';

export const routes: Route[] = [
  { path: '', component: 'app-child-view', name: 'Child View' },
  { path: 'child-view', component: 'app-child-view', name: 'Child View' },
  // The fallback route should always be after other alternatives.
  { path: '(.*)', component: 'app-not-found' }
];
