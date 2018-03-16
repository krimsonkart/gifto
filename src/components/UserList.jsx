import React from 'react';
import AutoFitImage from 'react-image-autofit-frame';
import { Link } from 'react-router';

const UserList = (props) => {
  const { id, title, description, image, date, type} = props;
  const listLink = `/list/${id}`;
  // console.log('Rendering product {}', props);
  return (
    <div className="col-md-3">
      <div className="embed-responsive embed-responsive-16by9">
        <AutoFitImage frameWidth="200px" frameHeight="200px" imgSrc={image}
          className="uk-thumbnail uk-thumbnail-mini uk-align-left"
        />
      </div>
      <div className="video-info">
        <h4><Link to={listLink}>{title}</Link></h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default UserList;
