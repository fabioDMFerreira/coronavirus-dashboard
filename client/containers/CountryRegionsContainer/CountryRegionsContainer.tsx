import { ChartsData } from '@common/types';
import SectionTitle from '@components/Section';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import CountryRegionsMultipleSerieContainer from './CountryRegionsMultipleSerieContainer';
import CountryRegionsSingleSerieContainer from './CountryRegionsSingleSerieContainer';

interface CountryRegionsContainerProps {
  country: string;
  show: boolean;
}

export default ({ country, show }: CountryRegionsContainerProps) => {
  const [chartsData, setChartsData] = useState<ChartsData>();
  const [pivotData, setPivotData] = useState<any>();
  const [regions, setRegions] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCountryData = () => {
    setLoading(true);

    Promise.all([
      fetch('/api/covid/countries/' + country)
        .then((res) => res.json())
        .then((chartsData) => {
          setChartsData(chartsData);
          setRegions(Object.keys(chartsData.totalCases));
          setLoading(false);
        }),
      fetch('/api/covid/countries/' + country + '/pivotData')
        .then((res) => res.json())
        .then((pivotData) => {
          setPivotData(pivotData);
        })
    ])
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCountryData();
  }, [country]);

  useEffect(() => {
    fetchCountryData();
  }, []);

  if (!show || (regions.length === 1 && !loading)) {
    return <span />;
  }

  return (
    <Fragment>
      <SectionTitle title={country}>
        {
          loading
          && <Spinner animation="grow" />
        }
      </SectionTitle>

      {
        !loading && chartsData && regions &&
        <CountryRegionsSingleSerieContainer chartsData={chartsData} regions={regions} />
      }
      {
        !loading && chartsData && pivotData &&
        <CountryRegionsMultipleSerieContainer chartsData={chartsData} regions={regions} pivotData={pivotData} country={country} />
      }

    </Fragment>
  );
};
