import { isCountryRegionsAvailable } from '@common/availableCountriesRegions';
import { ChartsData } from '@common/types';
import Section from '@components/Section';
import CountryRegionsContainer from 'client/containers/CountryRegionsContainer/CountryRegionsContainer';
import { getCountry } from 'client/redux/selectors';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';

import CountryMulipleSerieContainer from '../containers/CountryMulipleSerieContainer';
import CountrySingleSerieContainer from '../containers/CountrySingleSerieContainer/CountrySingleSerieContainer';

export default () => {

  const country = useSelector(getCountry);

  const [chartsData, setChartsData] = useState<ChartsData>();
  const [pivotData, setPivotData] = useState<any>();
  const [countries, setCountries] = useState<any>();

  useEffect(
    () => {
      fetch('/api/covid/countries/chartData')
        .then((res) => res.json())
        .then((chartsData) => {
          setChartsData(chartsData);
          setCountries(Object.keys(chartsData.totalCases));
        });

      fetch('/api/covid/countries/pivotData')
        .then((res) => res.json())
        .then((pivotData) => {
          setPivotData(pivotData);
        });
    }, []
  );

  return (
    <Fragment>
      {
        chartsData && countries &&
        <CountrySingleSerieContainer />
      }

      {
        (!country || !isCountryRegionsAvailable(country.value)) && chartsData && pivotData && countries &&
        <div className="mt-5">
          <Section title="World" />
          <CountryMulipleSerieContainer chartsData={chartsData} countries={countries} pivotData={pivotData} />
        </div>
      }

      {
        country && isCountryRegionsAvailable(country.value) &&
        <CountryRegionsContainer show={!!chartsData} country={country.value} />
      }
      <Section>

        {
          (!chartsData || !pivotData)
          && <Spinner animation="grow" />
        }
      </Section>
    </Fragment >
  );
};
