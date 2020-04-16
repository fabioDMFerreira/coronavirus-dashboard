import { ChartsData } from '@common/types';
import React, {
  useCallback
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MultipleSeriesDisplay from '../components/MultipleSeriesDisplay/MultipleSeriesDisplay';
import {
  setAllCountiesDataType,
  setAllCountiesFilter,
  setAllCountiesSelected,
} from '../redux/actions';
import {
  getAllCountiesDataType,
  getAllCountiesFilter,
  getAllCountiesSelected,
} from '../redux/selectors';
import { DataType } from '../types';

interface UsaCountiesMultipleSerieContainerProps {
  chartsData: ChartsData;
  regions: string[];
  pivotData: any;
  region: string;
}


export default ({
  chartsData,
  regions,
  pivotData,
  region }: UsaCountiesMultipleSerieContainerProps) => {
  const dispatch = useDispatch();


  const dataType = useSelector(getAllCountiesDataType);
  const setDataType = useCallback((value: DataType) => {
    dispatch(setAllCountiesDataType(value));
  }, [dispatch]);

  const regionsSelected = useSelector(getAllCountiesSelected);
  const setRegionsSelected = useCallback((value: any) => {
    dispatch(setAllCountiesSelected(value));
  }, [dispatch]);

  const filter = useSelector(getAllCountiesFilter);
  const setFilter = useCallback((value: any) => {
    dispatch(setAllCountiesFilter(value));
  }, [dispatch]);

  return (
    <MultipleSeriesDisplay
      dataType={dataType}
      changeDataType={setDataType}

      seriesOptions={regions}
      seriesSelected={regionsSelected}
      selectSeries={setRegionsSelected}

      chartsData={chartsData}
      pivotData={pivotData}

      groupSerie={region}
      seriesType={"Counties"}

      filter={filter}
      setFilter={setFilter}
    />
  );
};
