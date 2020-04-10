// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-pivottable/pivottable.css';
// import './App.css';
// import './index.css';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import App from './App';
import { persistor, store } from './redux/store';
// import * as serviceWorker from './serviceWorker';

export default () => (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
