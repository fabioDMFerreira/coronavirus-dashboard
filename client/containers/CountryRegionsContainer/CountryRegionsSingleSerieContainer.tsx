import { ChartsData } from '@common/types';
import { setCountryRegionDataType, setCountryRegionFilter, setCountryRegionTimeType } from 'client/redux/actions';
import { getCountryRegion, getCountryRegionDataType, getCountryRegionTimeType } from 'client/redux/selectors';
import React,
{ useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SingleSerieDisplay from '../../components/SingleSerieDisplay';

interface CountryRegionsSingleSerieContainerProps {
  chartsData: ChartsData;
  regions: string[];
}

export default ({ chartsData, regions }: CountryRegionsSingleSerieContainerProps) => {
  const dispatch = useDispatch();

  const countryRegion = useSelector(getCountryRegion);
  const setCountryRegion = useCallback((value: any) => { dispatch(setCountryRegionFilter(value)); }, [dispatch]);

  const dataType = useSelector(getCountryRegionDataType);
  const setDataType = useCallback((value: any) => { dispatch(setCountryRegionDataType(value)); }, [dispatch]);

  const timeType = useSelector(getCountryRegionTimeType);
  const setTimeType = useCallback((value: any) => { dispatch(setCountryRegionTimeType(value)); }, [dispatch]);

  return (
    <SingleSerieDisplay
      selectedSerie={countryRegion}
      changeSelectedSerie={setCountryRegion}
      seriesOptions={regions}

      dataType={dataType}
      changeDataType={setDataType}

      timeType={timeType}
      changeTimeType={setTimeType}

      chartsData={chartsData}
    />
  );
};
