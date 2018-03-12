import React, { Component } from 'react';
import { ProductsList, Footer } from 'components';
import { PRODUCT_API } from '../config';

export default class ProductListHome extends Component {

  constructor (props) {
    super(props);
    // Set the videoList to empty array
    this.state = { productsList: [] };
  }

  async componentDidMount () {
    // Calls GET /api/v1/videos to populate videosList
    try {
      const response = await fetch(PRODUCT_API);
      const productsList = await response.json();
      this.setState({ productsList });
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    const { productsList } = this.state;
    // console.log('Products: {}',productsList);
    return (
      <main className="container" id="container">
        <ProductsList products={productsList} />
        <Footer />
      </main>
    );
  }
}
