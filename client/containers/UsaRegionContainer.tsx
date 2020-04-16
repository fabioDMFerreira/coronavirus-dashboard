import { ChartsData } from '@common/types';
import SectionTitle from '@components/Section';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import useSWR from 'swr';

import UsaCountiesMultipleSerieContainer from './UsaCountiesMultipleSerieContainer';
import UsaCountiesSingleSerieContainer from './UsaCountiesSingleSerieContainer';

interface UsaCountyContainerProps {
  region: string;
  show: boolean;
}

export default ({ region, show }: UsaCountyContainerProps) => {

  const [chartsData, setChartsData] = useState<ChartsData>()
  const [pivotData, setPivotData] = useState<any>()
  const [regions, setRegions] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  useSWR(
    () => '/api/covid/usa/' + region,
    (api) => {
      setLoading(true);
      fetch(api)
        .then((res) => res.json())
        .then(([chartsData, pivotData, regions]) => {
          setChartsData(chartsData);
          setPivotData(pivotData);
          setRegions(regions)
          setLoading(false);
        })
    }
  );

  if (!show || (regions.length === 1 && !loading)) {
    return <span />
  }

  return (
    <Fragment>
      <SectionTitle title={region}>
        {
          loading
          && <Spinner animation="grow" />
        }
      </SectionTitle>

      {
        !loading && chartsData && regions &&
        <UsaCountiesSingleSerieContainer chartsData={chartsData} counties={regions} />
      }
      {
        !loading && chartsData && pivotData &&
        <UsaCountiesMultipleSerieContainer chartsData={chartsData} regions={regions} pivotData={pivotData} region={region} />
      }

    </Fragment>
  );
}
