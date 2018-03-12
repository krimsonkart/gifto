const API = __DEV__ ? 'http://localhost:3000/api/v1/videos' : '/api/v1/videos';
const PRODUCT_API = __DEV__ ? 'http://localhost:3001/getProducts' : '/getProducts';
const URL_DETAIL_API = __DEV__ ? 'http://localhost:3001/getProductDetails?url=' : '/getProductDetails?url=';
const ADD_API = __DEV__ ? 'http://localhost:3001/addProduct' : '/addProduct';
const API_KEY = 'YOUR_API_KEY';

export {
  API,
  PRODUCT_API,
  URL_DETAIL_API,
  ADD_API,
  API_KEY,
};
