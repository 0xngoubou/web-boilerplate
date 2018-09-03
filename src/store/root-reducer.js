import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reduceReducers } from '@/utils/store';
import { firebaseReducer } from 'react-redux-firebase';

import dataReducer from './data-reducer';
import defaultState from './default-state';

// Put new reducers here
const reducers = {
  router: routerReducer,
  firebase: firebaseReducer,
};
const defaultReducer = (s = {}) => s;
const finalCombinedReducers = combineReducers(
  Object.keys(defaultState).reduce((result, key) => {
    return Object.assign({}, result, {
      [key]: reducers[key] ? reducers[key] : defaultReducer,
    });
  }, reducers),
);
const rootReducer = reduceReducers(finalCombinedReducers, dataReducer);
export default rootReducer;
