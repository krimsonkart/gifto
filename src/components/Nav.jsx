import React, { Component } from 'react';
import { Link } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import FacebookLoginWithButton from 'react-facebook-login';
import { USER_ID, USER_NAME, USER_EMAIL } from '../config';
import { SocialLoginButton } from 'react-stormpath';
import FacebookProvider, { Login } from 'react-facebook';

export default class Nav extends Component {
  constructor (props) {
    super(props);
    this.state = { };
    this.responseFacebook = this.responseFacebook.bind(this);
  };

  responseFacebook = (response) => {
    if (typeof response !== 'undefined') {
      console.log('user logged in: ', response);
      localStorage.setItem(USER_ID, response.id);
      localStorage.setItem(USER_NAME, response.name);
      localStorage.setItem(USER_EMAIL, response.email);
      this.setState({
        user: response,
      });
    } else {
      alert('Facebook login error');
    }
  };
  // 422933988141945
  // 1028650170617109
  render () {
    const { user } = this.state;
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/">Gift-O</Link>
            <div className="App-intro">
              { !user &&
              <FacebookLogin
              appId="1028650170617109"
              autoLoad
              fields="name,email,picture"
              callback={this.responseFacebook}
              />}
              {user &&
                <p>Welcome back, {user.name}</p>
              }
            </div>
          </div>
        </div>
      </nav>
    );
  };
}
