import fetch from 'isomorphic-unfetch';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import useSWR from 'swr';

import AffixWrapper from './components/AffixWrapper';
import GoogleAnalyticsTracker from './components/GoogleAnalyticsTracker';
import SubscribeModal from './components/SubscribeModal';
import UrlHandler from './components/UrlHandler';
import CountriesComparisonContainer from './countries-comparison/CountriesComparisonContainer';
import CountryChartContainer from './country-chart/CountryChartContainer';
import BellIcon from './icons/BellIcon';
import TwitterIcon from './icons/TwitterIcon';
import { persistor, store } from './redux/store';
import RegionContainer from './region/RegionContainer';

function App() {
  const { data: countriesData } = useSWR('/api/covid/countries', (api) => fetch(api).then((res) => res.json()));
  const { data: regionData } = useSWR('/api/covid/usa', (api) => fetch(api).then((res) => res.json()));

  const [subscribeModal, setSubscribeModal] = useState(false);
  const [tab, setTab] = useState("country");

  let chartsData;
  let pivotData;
  let countries;

  if (countriesData) {
    [
      chartsData,
      pivotData,
      countries] = countriesData;
  }

  const tweet = async () => {
    try {
      const hash = await fetch('/api/state', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: store.getState() }),
      }).then((res) => res.text());

      const url = `${window.location.protocol}//${window.location.host}?view=${hash}`;
      window.location.href = `https://twitter.com/intent/tweet?text=Check here the coronavirus growth&url=${url}`;
    } catch (err) {

    }
  };


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <AffixWrapper offset={40} className="fixed-top">
            <Navbar bg="dark" variant="dark">
              <Container fluid>
                <Navbar.Brand href="#home">Covid-19 Growth</Navbar.Brand>
                <Navbar.Collapse>
                  <Nav.Item>
                    <Button variant="link" className={tab === "country" ? 'active' : ''} onClick={() => setTab("country")}>Country</Button>
                  </Nav.Item>
                  <Nav.Item>
                    <Button variant="link" className={tab === "allCountries" ? 'active' : ''} onClick={() => setTab("allCountries")}>All countries</Button>
                  </Nav.Item>
                  <Nav.Item>
                    <Button variant="link" className={tab === "usa" ? 'active' : ''} onClick={() => setTab("usa")}>USA</Button>
                  </Nav.Item>
                </Navbar.Collapse>
                <Form inline>
                  <Button className="mr-2" variant="primary" onClick={tweet}>
                    <TwitterIcon />
                    {' '}
                  Tweet
                  </Button>
                  <Button variant="warning" onClick={() => setSubscribeModal(true)}>
                    <BellIcon />
                    {' '}
                  Subscribe
                  </Button>
                </Form>
              </Container>
            </Navbar>
          </AffixWrapper>
          {
            chartsData && tab === 'country'
          && (
            <div className="mt-4 mb-5">
              <CountryChartContainer chartsData={chartsData} countries={countries} />
            </div>
          )
          }
          {
            chartsData && tab === 'allCountries'
          && (
            <div className="mt-4 mb-5">
              <CountriesComparisonContainer chartsData={chartsData} countries={countries} pivotData={pivotData} />
            </div>
          )
          }
          {
            regionData && tab === 'usa'
          && (
            <div className="mt-4 mb-5">
              <RegionContainer data={{ totalCases: regionData[0], totalDeaths: regionData[1] }} />
            </div>
          )
          }
          {
            !chartsData
          && <Spinner animation="grow" />
          }

          {
            subscribeModal
          && <SubscribeModal onClose={() => setSubscribeModal(false)} />
          }

          <UrlHandler />
          <GoogleAnalyticsTracker />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
