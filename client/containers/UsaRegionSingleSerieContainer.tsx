import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SingleSerieChart from '../components/SingleSerieDisplay/SingleSerieDisplay';
import { setRegionDataType, setRegionFilter, setRegionTimeType } from '../redux/actions';
import { getRegion, getRegionDataType, getRegionTimeType } from '../redux/selectors';
import { ChartsData } from '@common/types';

interface UsaRegionSingleSerieContainerProps {
  chartsData: ChartsData;
  regions: string[];
}

export default ({ chartsData, regions }: UsaRegionSingleSerieContainerProps) => {
  const dispatch = useDispatch();

  const region = useSelector(getRegion);
  const setCountry = useCallback((value: any) => { dispatch(setRegionFilter(value)); }, [dispatch]);

  const dataType = useSelector(getRegionDataType);
  const setDataType = useCallback((value: any) => { dispatch(setRegionDataType(value)); }, [dispatch]);

  const timeType = useSelector(getRegionTimeType);
  const setTimeType = useCallback((value: any) => { dispatch(setRegionTimeType(value)); }, [dispatch]);


  return (
    <SingleSerieChart
      selectedSerie={region}
      changeSelectedSerie={setCountry}
      seriesOptions={regions}

      dataType={dataType}
      changeDataType={setDataType}

      timeType={timeType}
      changeTimeType={setTimeType}

      chartsData={chartsData}
    />
  );
};
