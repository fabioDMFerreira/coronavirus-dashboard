import { ChartsData } from '@common/types';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import useSWR from 'swr';

import UsaRegionMultipleSerieContainer from '../containers/UsaRegionMultipleSerieContainer';
import UsaRegionSingleSerieContainer from '../containers/UsaRegionSingleSerieContainer';


export default () => {
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
        chartsData && pivotData && regions &&
        <UsaRegionMultipleSerieContainer chartsData={chartsData} regions={regions} pivotData={pivotData} />
      }
      {
        !chartsData
        && <Spinner animation="grow" />
      }
    </Fragment>
  );
}
