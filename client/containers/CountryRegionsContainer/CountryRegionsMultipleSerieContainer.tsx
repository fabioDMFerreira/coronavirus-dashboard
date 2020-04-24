
import { ChartsData } from '@common/types';
import React, {
  useCallback
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MultipleSeriesDisplay from '../../components/MultipleSeriesDisplay/MultipleSeriesDisplay';
import {
  setAllCountryRegionsDataType,
  setAllCountryRegionsFilter,
  setAllCountryRegionsSelected,
} from '../../redux/actions';
import {
  getAllCountryRegionsDataType,
  getAllCountryRegionsFilter,
  getAllCountryRegionsSelected,
} from '../../redux/selectors';
import { DataType } from '../../types';

interface CountryRegionsMultipleSerieContainerProps {
  chartsData: ChartsData;
  regions: string[];
  pivotData: any;
  country: string;
}


export default ({
  chartsData,
  regions,
  pivotData,
  country
}: CountryRegionsMultipleSerieContainerProps) => {
  const dispatch = useDispatch();

  const dataType = useSelector(getAllCountryRegionsDataType);
  const setDataType = useCallback((value: DataType) => {
    dispatch(setAllCountryRegionsDataType(value));
  }, [dispatch]);

  const regionsSelected = useSelector(getAllCountryRegionsSelected);
  const setRegionsSelected = useCallback((value: any) => {
    dispatch(setAllCountryRegionsSelected(value));
  }, [dispatch]);

  const filter = useSelector(getAllCountryRegionsFilter);
  const setFilter = useCallback((value: any) => {
    dispatch(setAllCountryRegionsFilter(value));
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

      groupSerie={country}
      seriesType={"Counties"}

      filter={filter}
      setFilter={setFilter}
    />
  );
};
