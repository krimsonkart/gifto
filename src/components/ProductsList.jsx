import React from 'react';
import { Link } from 'react-router';
import { Product } from 'components';

const ProductsList = ({ products: products, listId: listId }) => (
  <div>
    <div className="row">
      <div className="col-md-12">
        <h4><Link to={'/addProduct',listId}>New</Link></h4>
      </div>
    </div>
    <div className="row">
      {
        products
          .map((product, i) => <Product key={i} {...product}/>)
      }
    </div>
    <hr />
  </div>
);

export default ProductsList;
