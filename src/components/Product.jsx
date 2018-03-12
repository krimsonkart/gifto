import React from 'react';

const Product = (props) => {
  const { url, title, description, image} = props;
  // console.log('Rendering product {}', props);
  return (
    <div className="col-md-3">
      <div className="embed-responsive embed-responsive-16by9">
        <img className="uk-thumbnail uk-thumbnail-mini uk-align-left" src={image} />
      </div>
      <div className="video-info">
        <h4><a href="#">{title}</a></h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Product;
