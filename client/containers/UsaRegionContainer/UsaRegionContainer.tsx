import { ChartsData } from '@common/types';
import SectionTitle from '@components/Section';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import UsaCountiesMultipleSerieContainer from './UsaCountiesMultipleSerieContainer';
import UsaCountiesSingleSerieContainer from './UsaCountiesSingleSerieContainer';

interface UsaCountyContainerProps {
  region: string;
  show: boolean;
}

export default ({ region, show }: UsaCountyContainerProps) => {

  const [chartsData, setChartsData] = useState<ChartsData>();
  const [pivotData, setPivotData] = useState<any>();
  const [counties, setCounties] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRegionData = () => {
    setLoading(true);

    Promise.all([

      fetch('/api/covid/usa/regions/' + region + '/chartData')
        .then((res) => res.json())
        .then((chartsData) => {
          setChartsData(chartsData);
          setCounties(Object.keys(chartsData.totalCases));
          setLoading(false);
        }),
      fetch('/api/covid/usa/regions/' + region + '/pivotData')
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
    fetchRegionData();
  }, [region]);

  useEffect(() => {
    fetchRegionData();
  }, []);

  if (!show || (counties.length === 1 && !loading)) {
    return <span />;
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
};
