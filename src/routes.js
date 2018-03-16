import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
  Link,
} from 'react-router';
import Layout from 'components';
import { ProductListHome, AddProduct, ListsHome, AddList } from 'containers';

// App routes
const Routes = (
  <Router history={hashHistory}>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Layout}>
        <IndexRoute component={ListsHome} />
        <Route path="/addList" component={AddList} />
        <Route path="/addProduct/:listId" component={AddProduct} />
        <Route path="/list/:listId" component={ProductListHome} />
      </Route>
    </div>
  </Router>
);

export default Routes;
