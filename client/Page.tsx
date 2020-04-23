import Head from 'next/head'
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import GoogleAnalyticsTracker from './components/GoogleAnalyticsTracker';
import RouterHeader from './containers/RouterHeader';
import UrlHandler from './containers/UrlHandler';
import { persistor, store } from './redux/store';


function App(Component: any) {

  return (
    <Fragment>
      <Head>
        <title>Covid-19</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
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
    </Fragment>

  );
}

export default App;
