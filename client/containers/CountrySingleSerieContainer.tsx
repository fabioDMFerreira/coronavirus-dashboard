import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SingleSerieChart from '../components/SingleSerieDisplay/SingleSerieDisplay';
import { setCountryDataType, setCountryFilter, setCountryTimeType } from '../redux/actions';
import { getCountry, getCountryDataType, getCountryTimeType } from '../redux/selectors';
import {  ChartsData } from '../services/ChartSerializer';

export interface CountrySingleSerieContainer {
  chartsData: ChartsData;
  countries: string[];
}

export default ({ chartsData, countries }: CountrySingleSerieContainer) => {
  const dispatch = useDispatch();


  const country = useSelector(getCountry);
  const setCountry = useCallback((value: any) => { dispatch(setCountryFilter(value)); }, [dispatch]);

  const dataType = useSelector(getCountryDataType);
  const setDataType = useCallback((value: any) => { dispatch(setCountryDataType(value)); }, [dispatch]);

  const timeType = useSelector(getCountryTimeType);
  const setTimeType = useCallback((value: any) => { dispatch(setCountryTimeType(value)); }, [dispatch]);


  return (
    <SingleSerieChart
      selectedSerie={country}
      changeSelectedSerie={setCountry}
      seriesOptions={countries}

      dataType={dataType}
      changeDataType={setDataType}

      timeType={timeType}
      changeTimeType={setTimeType}

      chartsData={chartsData}
    />
  );
};
