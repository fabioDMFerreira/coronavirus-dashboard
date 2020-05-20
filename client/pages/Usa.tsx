import { ChartsData } from '@common/types';
import Section from '@components/Section';
import UsaRegionContainer from 'client/containers/UsaRegionContainer/UsaRegionContainer';
import { setRegionFilter } from 'client/redux/actions';
import { getRegion } from 'client/redux/selectors';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useCallback,useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch,useSelector } from 'react-redux';

import UsaRegionMultipleSerieContainer from '../containers/UsaAllRegionsMultipleSerieContainer';
import UsaAllRegionsSingleSerieContainer from '../containers/UsaAllRegionsSingleSerieContainer';


export default () => {
  const dispatch = useDispatch();

  const region = useSelector(getRegion);
  const setRegion = useCallback((value: any) => { dispatch(setRegionFilter(value)); }, [dispatch]);

  const [chartsData, setChartsData] = useState<ChartsData>();
  const [pivotData, setPivotData] = useState<any>();
  const [regions, setRegions] = useState<any>();


  useEffect(() => {
    fetch('/api/covid/usa/chartData')
      .then((res) => res.json())
      .then((chartsData) => {
        setChartsData(chartsData);
        setRegions(Object.keys(chartsData.totalCases));

        if (!region) {
          setRegion({ label: 'USA', value: 'USA' });
        }
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
        <UsaAllRegionsSingleSerieContainer chartsData={chartsData} regions={regions} />
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
