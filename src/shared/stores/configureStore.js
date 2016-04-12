import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddelware from '../middlewares/api';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger({
  level : 'info',
  collapsed : false,
  logger : console,
  predicate : (getState, action) => true
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  apiMiddelware,
  logger
)(createStore);

/**
 * Make store object that get initial state
 * @param {object} initialState Initial state for server-side
 * @returns {object} store Make store object
 */
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}