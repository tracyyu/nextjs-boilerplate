/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const LocalStorage = require('node-localstorage').LocalStorage;
const axios = require('axios');

class APIClient {
  constructor() {
    /* Create local Storage */
    this._localStorage = null;
    if (typeof localStorage === 'undefined' || this._localStorage === null) {
      this._localStorage = new LocalStorage('./scratch');
    }
    /* Axios Configuration for request & response */
    this._basePath = process.env.SERVER_DOMAIN || 'http://localhost:3000';
    this._header = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    axios.interceptors.request.use(config => {
      const token = this._localStorage.getItem('api_auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    axios.interceptors.response.use(this.handleSucess, this.handleErrors);
  }

  handleSucess(response) {
    return response;
  }

  handleErrors(error) {
    switch (error.response.status) {
      case 401:
        // leads to re-directing
        console.log('401', error.response.data);
        break;
      case 403:
        // leads to re-directing
        console.log('403', error.response.data);
        break;
      case 404:
        // leads to re-directing
        console.log('404', error.response.data);
        break;
      default:
        // leads to re-directing
        console.log('500', error.response.data);
        break;
    }
    return error;
  }

  setAuthorizationHeader() {
    const token = this._localStorage.getItem('api_auth_token');
    if (token) {
      this._header.Authorization = `Bearer ${token}`;
    }
  }

  storeAuthenticationToken(response) {
    const token = response.headers.authorization;
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      this._token = token.slice(7, token.length);
    }
    this._localStorage.setItem('api_auth_token', this._token);
  }

  get(path, options = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this._basePath}${path}`, {
          headers: this._header,
          params: options
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(this.handleErrors(error));
        });
    });
  }

  post(path, payload, options = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this._basePath}${path}`, payload, {
          headers: this._header,
          params: options
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(this.handleErrors(error));
        });
    });
  }

  postAuth(path, payload, options = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this._basePath}${path}`, payload, {
          headers: this._header,
          params: options
        })
        .then(response => {
          this.storeAuthenticationToken(response);
          resolve(response);
        })
        .catch(error => {
          reject(this.handleErrors(error));
        });
    });
  }

  put(path, payload, options = {}) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${this._basePath}${path}`, payload, {
          headers: this._header,
          params: options
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(this.handleErrors(error));
        });
    });
  }

  patch(path, payload, options = {}) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${this._basePath}${path}`, payload, {
          headers: this._header,
          params: options
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(this.handleErrors(error));
        });
    });
  }

  delete(path, payload, options = {}) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this._basePath}${path}`, payload, {
          headers: this._header,
          params: options
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(this.handleErrors(error));
        });
    });
  }
}

module.exports = APIClient;
