import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database

import middleware from '../middleware';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import defaultState from './default-state';
import { firebase as fbConfig, reactReduxFirebase as rrfConfig } from '../../configs/.env';

// Initialize firebase instance
firebase.initializeApp(fbConfig);

export default function configureStore({ history }) {
  const sagaMiddleware = createSagaMiddleware();
  const routeMiddleWare = routerMiddleware(history);
  const reduxDEC = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = (process.env.NODE_ENV !== 'production' && reduxDEC) ? reduxDEC({}) : compose;
  const store = createStore(rootReducer, defaultState, composeEnhancers(
    applyMiddleware(...middleware, routeMiddleWare, sagaMiddleware),
    reactReduxFirebase(firebase, rrfConfig),
  ));
  sagaMiddleware.run(rootSaga);

  return store;
}
