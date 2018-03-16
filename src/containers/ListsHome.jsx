import React, { Component } from 'react';
import { UserLists, Footer } from 'components';
import {LISTS_API} from '../config';

export default class ListsHome extends Component {

  constructor (props) {
    super(props);
    // Set the videoList to empty array
    const userId = localStorage.getItem('user_id');
    this.state = { userLists: [], userId };
  }

  async componentDidMount () {
    // Calls GET /api/v1/videos to populate videosList
    try {
      const response = await fetch(`${LISTS_API}${this.state.userId}`);
      const userLists = await response.json();
      this.setState({ userLists });
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    const { userLists } = this.state;
    // console.log('Products: {}',userLists);
    return (
      <main className="container" id="container">
        <UserLists lists={userLists} />
        <Footer />
      </main>
    );
  }
}
