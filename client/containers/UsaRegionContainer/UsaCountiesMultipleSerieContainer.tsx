import { ChartsData } from '@common/types';
import React, {
  useCallback
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MultipleSeriesDisplay from '../../components/MultipleSeriesDisplay/MultipleSeriesDisplay';
import {
  setAllCountiesDataType,
  setAllCountiesFilter,
  setAllCountiesSelected,
} from '../../redux/actions';
import {
  getAllUsaCountiesDataType,
  getAllUsaCountiesFilter,
  getAllUsaCountiesSelected,
} from '../../redux/selectors';
import { DataType } from '../../types';

interface UsaCountiesMultipleSerieContainerProps {
  chartsData: ChartsData;
  counties: string[];
  pivotData: any;
  region: string;
}


export default ({
  chartsData,
  counties,
  pivotData,
  region
}: UsaCountiesMultipleSerieContainerProps) => {
  const dispatch = useDispatch();

  const dataType = useSelector(getAllUsaCountiesDataType);
  const setDataType = useCallback((value: DataType) => {
    dispatch(setAllCountiesDataType(value));
  }, [dispatch]);

  const regionsSelected = useSelector(getAllUsaCountiesSelected);
  const setRegionsSelected = useCallback((value: any) => {
    dispatch(setAllCountiesSelected(value));
  }, [dispatch]);

  const filter = useSelector(getAllUsaCountiesFilter);
  const setFilter = useCallback((value: any) => {
    dispatch(setAllCountiesFilter(value));
  }, [dispatch]);

  return (
    <MultipleSeriesDisplay
      dataType={dataType}
      changeDataType={setDataType}

      seriesOptions={counties}
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
