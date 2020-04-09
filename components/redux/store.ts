import { compose,createStore } from 'redux';

import rootReducer from './reducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(rootReducer,
  composeEnhancers());
