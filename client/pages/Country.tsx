import { ChartsData } from '@common/types';
import Section from '@components/Section';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useEffect,useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import CountryMulipleSerieContainer from '../containers/CountryMulipleSerieContainer';
import CountrySingleSerieContainer from '../containers/CountrySingleSerieContainer';

export default () => {
  const [chartsData, setChartsData] = useState<ChartsData>()
  const [pivotData, setPivotData] = useState<any>()
  const [countries, setCountries] = useState<any>()

  useEffect(
    () => {
      fetch('/api/covid/countries')
        .then((res) => res.json())
        .then((chartsData) => {
          setChartsData(chartsData);
          setCountries(Object.keys(chartsData.totalCases))
        })

      fetch('/api/covid/countries/pivotData')
        .then((res) => res.json())
        .then((pivotData) => {
          setPivotData(pivotData);
        })
    }, []
  );

  return (
    <Fragment>
      {
        chartsData && countries &&
        <CountrySingleSerieContainer chartsData={chartsData} countries={countries} />
      }


      {
        chartsData && pivotData && countries &&
        <div className="mt-5">
          <Section title="World" />
          <CountryMulipleSerieContainer chartsData={chartsData} countries={countries} pivotData={pivotData} />
        </div>
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
