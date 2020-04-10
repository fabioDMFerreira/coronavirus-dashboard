import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MultipleSeriesDisplay from '../components/MultipleSeriesDisplay/MultipleSeriesDisplay';
import { setAllCountriesDataType, setAllCountriesSelected } from '../redux/actions';
import { getAllCountriesDataType, getAllCountriesSelected } from '../redux/selectors';
import { ChartsData } from '../services/ChartSerializer';
import { DataType } from '../types';

interface CountriesComparisonContainerProps {
  chartsData: ChartsData;
  countries: string[];
  pivotData: any;
}


export default ({ chartsData, countries, pivotData }: CountriesComparisonContainerProps) => {
  const dispatch = useDispatch();


  const dataType = useSelector(getAllCountriesDataType);
  const setDataType = useCallback((value: DataType) => {
    dispatch(setAllCountriesDataType(value));
  }, [dispatch]);

  // const countriesSelected = useSelector((state: ReduxReducerState) => {
  //   const result = getAllCountriesSelected(state);
  //   return result || getTopTenCountries(chartsData).map((country) => ({ label: country, value: country }));
  // });
  const countriesSelected = useSelector(getAllCountriesSelected);
  const setCountriesSelected = useCallback((value: any) => {
    dispatch(setAllCountriesSelected(value));
  }, [dispatch]);


  return (
    <MultipleSeriesDisplay
      dataType={dataType}
      changeDataType={setDataType}

      seriesOptions={countries}
      seriesSelected={countriesSelected}
      selectSeries={setCountriesSelected}

      chartsData={chartsData}
      pivotData={pivotData}

      groupSerie="World"
      seriesType="Countries"
    />
  );
};
