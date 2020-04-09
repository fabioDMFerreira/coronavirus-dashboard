import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AreaChart from '../components/AreaChart';
import { DataType } from '../types';
import { ChartsData } from '../services/ChartSerializer';

import { parseChartsDataToHighchartsFormat } from '../countries-comparison/CountriesComparisonContainer';
import { getRegionDataType } from '../redux/selectors';
import { setRegionDataType } from '../redux/actions';

interface RegionContainer {
  data: ChartsData
}

export default ({ data }: RegionContainer) => {
  const dispatch = useDispatch();

  const dataType = useSelector(getRegionDataType);
  const setDataType = useCallback((value: DataType) => {
    dispatch(setRegionDataType(value));
  }, [dispatch]);

  const [series, setSeries] = useState<any>();

  useEffect(
    () => {
      const series = parseChartsDataToHighchartsFormat(data, dataType);
      setSeries(series);
    },
    [data, dataType],
  );

  return (
    <div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value={DataType.TOTAL_CASES}
            checked={dataType === DataType.TOTAL_CASES}
            onChange={() => setDataType(DataType.TOTAL_CASES)}
          />
          Total Cases
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value={DataType.TOTAL_DEATHS}
            checked={dataType === DataType.TOTAL_DEATHS}
            onChange={() => setDataType(DataType.TOTAL_DEATHS)}
          />
          Total Deaths
        </label>
      </div>
      {
        series
        && (
        <AreaChart
          series={series}
        />
        )
      }
    </div>
  );
};
