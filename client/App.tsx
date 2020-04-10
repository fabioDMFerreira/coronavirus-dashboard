import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GoogleAnalyticsTracker from './components/GoogleAnalyticsTracker';
import Header from './containers/Header';
import UrlHandler from './containers/UrlHandler';
import Country from './pages/Country';
import Usa from './pages/Usa'
import { setTab } from './redux/actions';
import { getTab } from './redux/selectors';

function App() {
  const dispatch = useDispatch();

  const tab = useSelector(getTab);
  const changeTab = useCallback(value => dispatch(setTab(value)), [dispatch])

  return (

    <div className="App">

      <Header tab={tab} setTab={changeTab} />

      <div className="mt-4 mb-5">
        <Country show={tab === 'country'} />
        <Usa show={tab == 'usa'} />
      </div>

      <UrlHandler />
      <GoogleAnalyticsTracker />
    </div>

  );
}

export default App;
