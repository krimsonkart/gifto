import React from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
};

const Header = () => (
  <header className="header">
    <div className="text-center">
      <FacebookLogin
        appId="1088597931155576"
        fields="name,email,picture"
        scope="public_profile,user_friends,email"
        callback={responseFacebook}
      />
    </div>
  </header>
);

export default Header;
