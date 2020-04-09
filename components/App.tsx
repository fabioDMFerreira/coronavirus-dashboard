import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useSWR from 'swr';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';

import CountryChartContainer from './country-chart/CountryChartContainer';
import CountriesComparisonContainer from './countries-comparison/CountriesComparisonContainer';

import RegionContainer from './region/RegionContainer';
import AffixWrapper from './components/AffixWrapper';
import BellIcon from './icons/BellIcon';
import TwitterIcon from './icons/TwitterIcon';
import SubscribeModal from './components/SubscribeModal';
import store from './redux/store';
import UrlHandler from './components/UrlHandler';

function App() {

  const { data: countriesData } = useSWR('/api/covid/countries', api => fetch(api).then(res => res.json()));
  const { data: regionData } = useSWR('/api/covid/usa', api => fetch(api).then(res => res.json()))

  const [subscribeModal, setSubscribeModal] = useState(false);

  let chartsData;
  let pivotData;
  let countries;

  if (countriesData) {
    [chartsData, pivotData, countries] = countriesData;
  }

  const tweet = async () => {
    const hash = await fetch('/api/state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ state: store.getState() })
    }).then(res => res.text());

    const url = window.location.protocol + '//' + window.location.host + '?view=' + hash;
    window.location.href = "https://twitter.com/intent/tweet?text=Check here the coronavirus growth&url=" + url
  }

  useEffect(() => {
    ReactGA.initialize('UA-127455597-4')
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])



  return (
    <Provider store={store}>
      <div className="App">
        <AffixWrapper offset={40} className={'fixed-top'}>
          <Navbar bg="dark" variant="dark">
            <Container fluid>
              <Navbar.Brand href="#home">Covid-19 Growth</Navbar.Brand>
              <Form inline>
                <Button className="mr-2" variant="primary" onClick={tweet}>
                  <TwitterIcon /> Tweet
              </Button>
                <Button variant="warning" onClick={() => setSubscribeModal(true)}>
                  <BellIcon /> Subscribe
            </Button>
              </Form>
            </Container>
          </Navbar>
        </AffixWrapper>
        {
          chartsData &&
          <div className="mt-4 mb-5">
            <CountryChartContainer chartsData={chartsData} countries={countries} />
          </div>
        }
        {
          chartsData &&
          <div className="mt-4 mb-5">
            <CountriesComparisonContainer chartsData={chartsData} countries={countries} pivotData={pivotData} />
          </div>
        }
        {
          regionData &&
          <div className="mt-4 mb-5">
            <RegionContainer data={{ totalCases: regionData[0], totalDeaths: regionData[1] }} />
          </div>
        }
        {
          !chartsData &&
          <Spinner animation="grow" />
        }

        {
          subscribeModal &&
          <SubscribeModal show={subscribeModal} onClose={() => setSubscribeModal(false)} />
        }

        <UrlHandler />
      </div>
    </Provider>
  );
}

export default App;
