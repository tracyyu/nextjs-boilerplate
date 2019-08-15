import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

export default (initialState = {}) => {
  const middleware = [thunkMiddleware, ReduxPromise, createLogger()];

  const finalCreateStore = compose(applyMiddleware(...middleware))(createStore);

  const store = finalCreateStore(reducers, initialState);

  return store;
  // return createStore(reducers, initialState, applyMiddleware(thunkMiddleware));
};