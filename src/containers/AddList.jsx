import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {ADD_LIST_API, URL_DETAIL_API, USER_ID} from '../config';
import { Footer } from 'components';
import AutoFitImage from 'react-image-autofit-frame';

export default class AddList extends Component {

  constructor (props) {
    super(props);
    // const { match: { params } } = this.props;
    // console.log(params);

    // Set the URL to empty string
    const userId = localStorage.getItem('user_id');
    this.state = { title:'', description:'', image:'', date:'', type:'', userId};
    // Bind to this
    // , userId:${params.userId}
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
  }

  handleTitleChange (event) {
    const value = event.target.value;

    this.setState(() => {
      return {
        title: value,
      };
    });
  }

  handleDateChange (event) {
    const value = event.target.value;
    this.setState(() => {
      return {
        date: value,
      };
    });
  }

  handleTypeChange (event) {
    const value = event.target.value;
    this.setState(() => {
      return {
        type: value,
      };
    });
  }

  handleDescriptionChange (event) {
    const value = event.target.value;

    this.setState(() => {
      return {
        description: value,
      };
    });
  }

  handleImageChange (event) {
    const value = event.target.value;

    this.setState(() => {
      return {
        image: value,
      };
    });
  }

  async handleClick () {
    // The URL returned by Filestack is set in the state
    try {
      const { filesUploaded } = await this.filestack();
      const url = filesUploaded[0].url;
      this.setState({ url });
    } catch (e) {
      console.log(e);
    }
  }

  async sendToServer () {
    // POST to /api/v1/videos to insert a new video in the DB
    console.log('Adding List');
    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    };
    try {
      const response = await fetch(ADD_LIST_API, request);
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  async handleSubmit (e) {
    e.preventDefault();
    // First we call the process API to start the trascoding and get the uuid
    try {
      const server = await this.sendToServer();
      if (this.props.onSubmit) {
        this.props.onSubmit(
          this.state
        );
      }
      hashHistory.replace('/');
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    console.log('Rendering List adding page');
    const { title, description, date, type, image} = this.state;
    return (
      <div className="container">
        <div className=".col-md-offset-4 media-list">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title text-center">Add new List</h2>
            </div>
            <div className="panel-body">
              <form name="document-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    className="form-control"
                    placeholder="Enter the title..."
                    value={this.state.title}
                    autoComplete="on"
                    onChange={this.handleTitleChange}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Description</label>
                  <input
                    className="form-control"
                    placeholder="Enter the description..."
                    value={this.state.description}
                    autoComplete="on"
                    onChange={this.handleDescriptionChange}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    className="form-control"
                    placeholder="Enter the date..."
                    value={this.state.date}
                    autoComplete="on"
                    onChange={this.handleDateChange}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <input
                    className="form-control"
                    placeholder="Select tye"
                    value={this.state.type}
                    autoComplete="on"
                    onChange={this.handleTypeChange}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Image url</label>
                  <input
                    className="form-control"
                    placeholder="Enter the image url..."
                    value={this.state.image}
                    autoComplete="on"
                    onChange={this.handleImageChange}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image</label>
                  { // When the URL is returned we show the preview
                      this.state.image &&
                      <div className="embed-responsive embed-responsive-16by9">
                        <div className="thumbnail">
                          <AutoFitImage frameWidth="400px" frameHeight="400px" imgSrc={this.state.image}
                            className="uk-thumbnail uk-thumbnail-mini uk-align-left"
                          />
                        </div>
                      </div>
                  }
                </div>
                <button
                  className="btn btn-filestack btn-block submit"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
