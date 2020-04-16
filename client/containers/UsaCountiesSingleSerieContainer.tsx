import { ChartsData } from '@common/types';
import { setCountyDataType, setCountyFilter, setCountyTimeType } from 'client/redux/actions';
import { getCounty, getCountyDataType,getCountyTimeType } from 'client/redux/selectors';
import React,
{ useCallback,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SingleSerieChart from '../components/SingleSerieDisplay/SingleSerieDisplay';

interface UsaCountiesSingleSerieContainerProps {
  chartsData: ChartsData;
  counties: string[];
}

export default ({ chartsData, counties }: UsaCountiesSingleSerieContainerProps) => {
  const dispatch = useDispatch();

  const county = useSelector(getCounty);
  const setCounty = useCallback((value: any) => { dispatch(setCountyFilter(value)); }, [dispatch]);

  const dataType = useSelector(getCountyDataType);
  const setDataType = useCallback((value: any) => { dispatch(setCountyDataType(value)); }, [dispatch]);

  const timeType = useSelector(getCountyTimeType);
  const setTimeType = useCallback((value: any) => { dispatch(setCountyTimeType(value)); }, [dispatch]);


  useEffect(() => {
    const selected = Object.keys(chartsData.totalCases)[0];
    setCounty({ label: selected, value: selected });
  }, [chartsData])

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
