import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MultipleSeriesDisplay from '../components/MultipleSeriesDisplay/MultipleSeriesDisplay';
import { setAllRegionsDataType, setAllRegionsSelected, setAllRegionsFilter } from '../redux/actions';
import { getAllRegionsDataType, getAllRegionsSelected, getAllRegionsFilter } from '../redux/selectors';
import { DataType } from '../types';
import { ChartsData } from '@common/types';

interface CountriesComparisonContainerProps {
  chartsData: ChartsData;
  regions: string[];
  pivotData: any;
}


export default ({ chartsData, regions, pivotData }: CountriesComparisonContainerProps) => {
  const dispatch = useDispatch();


  const dataType = useSelector(getAllRegionsDataType);
  const setDataType = useCallback((value: DataType) => {
    dispatch(setAllRegionsDataType(value));
  }, [dispatch]);

  // const regionsSelected = useSelector((state: ReduxReducerState) => {
  //   const result = getAllRegionsSelected(state);
  //   return result || getTopTenCountries(chartsData).map((country) => ({ label: country, value: country }));
  // });
  const regionsSelected = useSelector(getAllRegionsSelected);
  const setRegionsSelected = useCallback((value: any) => {
    dispatch(setAllRegionsSelected(value));
  }, [dispatch]);

  const filter = useSelector(getAllRegionsFilter);
  const setFilter = useCallback((value: any) => {
    dispatch(setAllRegionsFilter(value));
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

      groupSerie={"USA"}
      seriesType={"Regions"}

      filter={filter}
      setFilter={setFilter}
    />
  );
};
