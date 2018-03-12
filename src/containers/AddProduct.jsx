import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {ADD_API, API, URL_DETAIL_API} from '../config';
import { Footer } from 'components';

export default class AddContainer extends Component {

  constructor (props) {
    super(props);
    // Set the URL to empty string
    this.state = {url: '', title: '', description: '', image:'', errors: null};
    // Bind to this
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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

  async handleUrlChange (event) {
    const value = event.target.value;
    this.setState(() => {
      return {
        url: value,
      };
    });
    let html = await this.getDetails(value);
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

  filestack = () => {
    return client.pick(
      {
        accept: 'video/*',
        maxSize: 1024 * 1024 * 100,
      }
    );
  };

  async getDetails (url) {
    // console.log('Fetching details for url {}', url);
    try {
      let response = await fetch(URL_DETAIL_API + encodeURIComponent(url));
      response = await response.json();
      this.setState(() => {
        return {
          image: response.image,
          description: response.description,
          title: response.title,
        };
      });
    } catch (e) {
      console.log(e);
    }
  }

  async sendToServer () {
    // POST to /api/v1/videos to insert a new video in the DB
    console.log('Adding product');
    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    };
    try {
      const response = await fetch(ADD_API, request);
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  async handleSubmit (e) {
    e.preventDefault();
    const { url, title, description, image } = this.state;
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
    const { url, title, description, image} = this.state;
    return (
      <div className="container">
        <div className=".col-md-offset-4 media-list">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title text-center">
                <span className="glyphicon glyphicon-sunglasses" /> Upload Picture
              </h2>
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
                  <label htmlFor="title">Url</label>
                  <input
                    className="form-control"
                    placeholder="Enter the url..."
                    value={this.state.url}
                    autoComplete="on"
                    onChange={this.handleUrlChange}
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
                          <img className="uk-thumbnail uk-thumbnail-mini uk-align-left" src={this.state.image} />
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
