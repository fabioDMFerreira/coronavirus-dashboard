import convertToCountryId from '@common/convertToCountryId';
import convertToCountryName from '@common/convertToCountryName';
import { ChartsData } from '@common/types';
import SectionTitle from '@components/Section';
import { setCountryRegionFilter } from 'client/redux/actions';
import { getCountryRegion } from 'client/redux/selectors';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useCallback,useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';

import CountryRegionsMultipleSerieContainer from './CountryRegionsMultipleSerieContainer';
import CountryRegionsSingleSerieContainer from './CountryRegionsSingleSerieContainer';

interface CountryRegionsContainerProps {
  country: string;
  show: boolean;
}

export default ({ country, show }: CountryRegionsContainerProps) => {
  const dispatch = useDispatch();

  const countryRegion = useSelector(getCountryRegion);
  const setCountryRegion = useCallback((value: any) => { dispatch(setCountryRegionFilter(value)); }, [dispatch]);

  const [chartsData, setChartsData] = useState<ChartsData>();
  const [pivotData, setPivotData] = useState<any>();
  const [regions, setRegions] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCountryData = () => {
    setLoading(true);

    Promise.all([
      fetch('/api/covid/countries/' + convertToCountryId(country) + '/regions/chartData')
        .then((res) => res.json())
        .then((chartsData) => {
          setChartsData(chartsData);
          setRegions(Object.keys(chartsData.totalCases).map(convertToCountryName));

          if (!countryRegion) {
            const option = Object.keys(chartsData.totalCases)[0];
            setCountryRegion({ label: option, value: option });
          }

          setLoading(false);
        }),
      fetch('/api/covid/countries/' + convertToCountryId(country) + '/regions/pivotData')
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
