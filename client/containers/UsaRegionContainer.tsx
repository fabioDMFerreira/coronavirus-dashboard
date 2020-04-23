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
  const [counties, setCounties] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  useSWR(
    () => '/api/covid/usa/' + region,
    (api) => {
      setLoading(true);
      fetch(api)
        .then((res) => res.json())
        .then((chartsData) => {
          setChartsData(chartsData);
          setCounties(Object.keys(chartsData.totalCases))
          setLoading(false);
        })
    }
  );

  useSWR(
    () => '/api/covid/usa/' + region + '/pivotData',
    api => {
      fetch(api)
        .then((res) => res.json())
        .then((pivotData) => {
          setPivotData(pivotData);
        })
    }
  )

  if (!show || (counties.length === 1 && !loading)) {
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
        !loading && chartsData && counties &&
        <UsaCountiesSingleSerieContainer chartsData={chartsData} counties={counties} />
      }
      {
        !loading && chartsData && pivotData &&
        <UsaCountiesMultipleSerieContainer chartsData={chartsData} counties={counties} pivotData={pivotData} region={region} />
      }

    </Fragment>
  );
}
