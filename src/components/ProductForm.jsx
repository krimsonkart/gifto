/*
 * Components
 */

import { Product } from 'components';

var ProductForm = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  },
  
  onUrlChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}));
  },
  
  onTitleChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {title: e.target.value}));
  },
  
  onDescriptionChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}));
  },
  
  onImageChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}));
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit();
  },

  render: function() {
    return (
      React.createElement('form', {onSubmit: this.onSubmit, className: 'ProductForm', noValidate: true},
        React.createElement('input', {
          type: 'text',
          placeholder: 'Url',
          value: this.props.value.url,
          onChange: this.onUrlChange,
        }),
        React.createElement('input', {
          type: 'description',
          placeholder: 'Description',
          value: this.props.value.title,
          onChange: this.onTitleChange,
        }),
        React.createElement('textarea', {
          placeholder: 'Description',
          value: this.props.value.description,
          onChange: this.onDescriptionChange,
        }),
        React.createElement('input', {
          placeholder: 'Image',
          value: this.props.value.image,
          onChange: this.onImageChange,
        }),
        React.createElement('button', {type: 'submit'}, "Add Product")
      )
    );
  },
});


/*
 * Constants
 */


var PRODUCT_TEMPLATE = {url: "", title: "", description: "", image:"", errors: null};



/*
 * Actions
 */


function updateNewProduct(product) {
  setState({ newProduct: product });
}


function submitNewProduct() {
  var product = Object.assign({}, state.newProduct, {key: state.products.length + 1, errors: {}});
  
  if (product.name && product.title) {
    setState(
      Object.keys(product.errors).length === 0
      ? {
          newProduct: Object.assign({}, PRODUCT_TEMPLATE),
          products: state.products.slice(0).concat(product),
        }
      : { newProduct: product }
    );
  }
}


/*
 * Model
 */


// The app's complete current state
var state = {};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);
  
  ReactDOM.render(
    React.createElement(ProductView, Object.assign({}, state, {
      onNewProductChange: updateNewProduct,
      onNewProductSubmit: submitNewProduct,
    })),
    document.getElementById('react-app')
  );
}

// Set initial data
setState({
  newProduct: Object.assign({}, PRODUCT_TEMPLATE),
});
