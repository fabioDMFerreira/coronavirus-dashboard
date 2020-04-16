import { ChartsData } from '@common/types';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import useSWR from 'swr';

import CountryMulipleSerieContainer from '../containers/CountryMulipleSerieContainer';
import CountrySingleSerieContainer from '../containers/CountrySingleSerieContainer';

export default () => {
  const [chartsData, setChartsData] = useState<ChartsData>()
  const [pivotData, setPivotData] = useState<any>()
  const [countries, setCountries] = useState<any>()

  useSWR(
    '/api/covid/countries',
    (api) =>
      fetch(api)
        .then((res) => res.json())
        .then(([chartsData, pivotData, countries]) => {
          setChartsData(chartsData);
          setPivotData(pivotData);
          setCountries(countries)
        })
  );

  return (
    <Fragment>
      {
        chartsData && countries &&
        <CountrySingleSerieContainer chartsData={chartsData} countries={countries} />
      }
      {
        chartsData && pivotData && countries &&
        <CountryMulipleSerieContainer chartsData={chartsData} countries={countries} pivotData={pivotData} />
      }
      {
        !chartsData
        && <Spinner animation="grow" />
      }
    </Fragment>
  );
};
