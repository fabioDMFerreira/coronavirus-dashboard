import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import GoogleAnalyticsTracker from './components/GoogleAnalyticsTracker';
import RouterHeader from './containers/RouterHeader';
import UrlHandler from './containers/UrlHandler';
import { persistor, store } from './redux/store';


function App(Component: any) {

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">

            <RouterHeader />

            <div className="mt-4 mb-5">
              <Component />
            </div>

            <UrlHandler />
            <GoogleAnalyticsTracker />
          </div>
        </PersistGate>
      </Provider>
    </React.StrictMode>

  );
}

export default App;
