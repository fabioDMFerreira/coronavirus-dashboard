import { ChartsData } from 'client/services/ChartSerializer';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import useSWR from 'swr';

import UsaRegionMultipleSerieContainer from '../containers/UsaRegionMultipleSerieContainer';
import UsaRegionSingleSerieContainer from '../containers/UsaRegionSingleSerieContainer';

export interface UsaProps {
  show: boolean;
}

export default ({ show }: UsaProps) => {
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

  if (!show) {
    return <Fragment />;
  }

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
