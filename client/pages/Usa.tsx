import { ChartsData } from '@common/types';
import Section from '@components/Section';
import UsaRegionContainer from 'client/containers/UsaRegionContainer/UsaRegionContainer';
import { getRegion } from 'client/redux/selectors';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useEffect,useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';

import UsaRegionMultipleSerieContainer from '../containers/UsaAllRegionsMultipleSerieContainer';
import UsaRegionSingleSerieContainer from '../containers/UsaAllRegionsSingleSerieContainer';


export default () => {

  const region = useSelector(getRegion);

  const [chartsData, setChartsData] = useState<ChartsData>();
  const [pivotData, setPivotData] = useState<any>();
  const [regions, setRegions] = useState<any>();

  useEffect(() => {
    fetch('/api/covid/usa/chartData')
      .then((res) => res.json())
      .then((chartsData) => {
        setChartsData(chartsData);
        setRegions(Object.keys(chartsData.totalCases));
      });

    fetch('/api/covid/usa/pivotData')
      .then((res) => res.json())
      .then((pivotData) => {
        setPivotData(pivotData);
      });
  }, []);

  return (
    <Fragment>
      {
        chartsData && regions &&
        <UsaRegionSingleSerieContainer chartsData={chartsData} regions={regions} />
      }
      {
        (!region || region.value === 'USA') && chartsData && pivotData && regions &&
        <Fragment>
          <Section title="USA" />
          <UsaRegionMultipleSerieContainer chartsData={chartsData} regions={regions} pivotData={pivotData} />
        </Fragment>
      }
      {
        region && region.value !== 'USA' &&
        <UsaRegionContainer show={!!chartsData} region={region.value} />
      }
      {
        (!chartsData || !pivotData)
        && <Spinner animation="grow" />
      }
    </Fragment>
  );
};
