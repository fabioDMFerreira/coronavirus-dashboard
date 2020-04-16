import { ChartsData } from '@common/types';
import { setCountyDataType, setCountyFilter, setCountyTimeType } from 'client/redux/actions';
import { getCounty, getCountyDataType, getCountyTimeType, getRegion } from 'client/redux/selectors';
import React,
{ useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SingleSerieChart from '../components/SingleSerieDisplay/SingleSerieDisplay';

interface UsaCountiesSingleSerieContainerProps {
  chartsData: ChartsData;
  counties: string[];
}

export default ({ chartsData, counties }: UsaCountiesSingleSerieContainerProps) => {
  const dispatch = useDispatch();

  const region = useSelector(getRegion);

  const county = useSelector(getCounty);
  const setCounty = useCallback((value: any) => { dispatch(setCountyFilter(value)); }, [dispatch]);

  const dataType = useSelector(getCountyDataType);
  const setDataType = useCallback((value: any) => { dispatch(setCountyDataType(value)); }, [dispatch]);

  const timeType = useSelector(getCountyTimeType);
  const setTimeType = useCallback((value: any) => { dispatch(setCountyTimeType(value)); }, [dispatch]);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    console.log('region changed');
    const selected = Object.keys(chartsData.totalCases)[0];
    setCounty({ label: selected, value: selected });
  }, [region])

  return (
    <SingleSerieChart
      selectedSerie={county}
      changeSelectedSerie={setCounty}
      seriesOptions={counties}

      dataType={dataType}
      changeDataType={setDataType}

      timeType={timeType}
      changeTimeType={setTimeType}

      chartsData={chartsData}
    />
  );
};
