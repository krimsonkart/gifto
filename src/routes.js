import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from 'react-router';
import Layout from 'components';
import { Home, ProductListHome, Add, AddProduct } from 'containers';

// App routes
const Routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={ProductListHome} />
      <Route path="AddProduct" component={AddProduct} />
      <Route path="Add" component={Add} />
    </Route>
  </Router>
);

export default Routes;
