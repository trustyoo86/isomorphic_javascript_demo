import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';

import App from '../../client/containers/App';
import Intro from '../../client/containers/intro/Intro';

export default function (history) {
  return (
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Intro } />
      </Route>
    </Router>
  );
};