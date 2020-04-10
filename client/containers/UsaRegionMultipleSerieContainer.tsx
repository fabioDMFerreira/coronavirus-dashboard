import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MultipleSeriesDisplay from '../components/MultipleSeriesDisplay/MultipleSeriesDisplay';
import { setAllRegionsDataType, setAllRegionsSelected } from '../redux/actions';
import { getAllRegionsDataType, getAllRegionsSelected } from '../redux/selectors';
import { ChartsData } from '../services/ChartSerializer';
import { DataType } from '../types';

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
    />
  );
};
