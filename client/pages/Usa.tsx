import { ChartsData } from '@common/types';
import Section from '@components/Section';
import UsaRegionContainer from 'client/containers/UsaRegionContainer';
import { getRegion } from 'client/redux/selectors';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

import UsaRegionMultipleSerieContainer from '../containers/UsaAllRegionsMultipleSerieContainer';
import UsaRegionSingleSerieContainer from '../containers/UsaAllRegionsSingleSerieContainer';


export default () => {

  const region = useSelector(getRegion);

  const [chartsData, setChartsData] = useState<ChartsData>()
  const [pivotData, setPivotData] = useState<any>()
  const [regions, setRegions] = useState<any>()

  useSWR(
    '/api/covid/usa',
    (api) =>
      fetch(api)
        .then((res) => res.json())
        .then(([chartsData, pivotData, regions]) => {
          setChartsData(chartsData);
          setPivotData(pivotData);
          setRegions(regions)
        })
  );

  return (
    <Fragment>
      {
        chartsData && regions &&
        <UsaRegionSingleSerieContainer chartsData={chartsData} regions={regions} />
      }
      {
        (region.value === 'USA' || !region) && chartsData && pivotData && regions &&
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
        !chartsData
        && <Spinner animation="grow" />
      }
    </Fragment>
  );
}
