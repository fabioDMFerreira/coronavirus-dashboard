import { ChartsData } from '@common/types';
import { setCountyDataType, setCountyFilter, setCountyTimeType } from 'client/redux/actions';
import { getUsaCounty, getUsaCountyDataType, getUsaCountyTimeType } from 'client/redux/selectors';
import React,
{ useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SingleSerieDisplay from '../../components/SingleSerieDisplay';

interface UsaCountiesSingleSerieContainerProps {
  chartsData: ChartsData;
  counties: string[];
}

export default ({ chartsData, counties }: UsaCountiesSingleSerieContainerProps) => {
  const dispatch = useDispatch();

  const county = useSelector(getUsaCounty);
  const setCounty = useCallback((value: any) => { dispatch(setCountyFilter(value)); }, [dispatch]);

  const dataType = useSelector(getUsaCountyDataType);
  const setDataType = useCallback((value: any) => { dispatch(setCountyDataType(value)); }, [dispatch]);

  const timeType = useSelector(getUsaCountyTimeType);
  const setTimeType = useCallback((value: any) => { dispatch(setCountyTimeType(value)); }, [dispatch]);

  return (
    <SingleSerieDisplay
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
