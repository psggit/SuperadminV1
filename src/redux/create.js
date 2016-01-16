import { compose, createStore, combineReducers } from 'redux';
import { syncHistory, routeReducer } from 'redux-simple-router';

const finalCreateStore = () => {
  const reducer = combineReducers({...{ routing: routeReducer }});

  // FIXME: Activate devtools only during dev
  const DevTools = require('../containers/DevTools/DevTools');
  const _finalCreateStore = compose( DevTools.instrument() )(createStore);
  const store = _finalCreateStore(reducer);

  return store;
};

export { finalCreateStore };
