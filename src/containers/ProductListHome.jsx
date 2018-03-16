import React, { Component } from 'react';
import { ProductsList, Footer, Nav } from 'components';
import { PRODUCT_API } from '../config';

export default class ProductListHome extends Component {

  constructor (props) {
    super(props);
    // Set the videoList to empty array
    this.state = { productsList: [], listId: props.params.listId };
  }

  async componentDidMount () {
    console.log('list id ', this.state.listId);
    // Calls GET /api/v1/videos to populate videosList
    try {
      const response = await fetch(`${PRODUCT_API}${this.state.listId}`);
      const productsList = await response.json();
      this.setState({ productsList });
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    const { productsList, listId } = this.state;
    // console.log('Products: {}',productsList);
    return (
      <main className="container" id="container">
        <ProductsList products={productsList} listId={listId}/>
      </main>
    );
  }
}
