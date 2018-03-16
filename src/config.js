const API = __DEV__ ? 'http://localhost:3000/api/v1/videos' : '/api/v1/videos';
const PRODUCT_API = __DEV__ ? 'http://localhost:3001/getProducts/' : '/getProducts/';
const LISTS_API = __DEV__ ? 'http://localhost:3001/getLists/' : '/getLists/';
const ADD_LIST_API = __DEV__ ? 'http://localhost:3001/addList' : '/addList';
const URL_DETAIL_API = __DEV__ ? 'http://localhost:3001/getProductDetails?url=' : '/getProductDetails?url=';
const ADD_API = __DEV__ ? 'http://localhost:3001/addProduct' : '/addProduct';
const API_KEY = 'YOUR_API_KEY';
const USER_ID = 'user_id';
const USER_NAME = 'user_name';
const USER_EMAIL = 'user_email';

export {
  API,
  USER_ID,
  USER_NAME,
  USER_EMAIL,
  PRODUCT_API,
  LISTS_API,
  URL_DETAIL_API,
  ADD_LIST_API,
  ADD_API,
  API_KEY,
};
