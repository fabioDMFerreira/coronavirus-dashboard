import React, { useState, useEffect, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';

import CountryChart from './CountryChart';
import { ChartsData, calculateGrowthRate } from '../services/ChartSerializer';
import { DataType, TimeType, ColumnSerie } from '../types';
import { getCountry, getCountryDataType, getCountryTimeType } from '../redux/selectors';
import { setCountryFilter, setCountryDataType, setCountryTimeType } from '../redux/actions';

interface CountryChartContainerProps {
  chartsData: ChartsData,
  countries: string[]
}

export default ({ chartsData, countries }: CountryChartContainerProps) => {
  const dispatch = useDispatch();


  const country = useSelector(getCountry);
  const setCountry = useCallback((value: any) => { dispatch(setCountryFilter(value)); }, [dispatch]);

  const dataType = useSelector(getCountryDataType);
  const setDataType = useCallback((value: any) => { dispatch(setCountryDataType(value)); }, [dispatch]);

  const timeType = useSelector(getCountryTimeType);
  const setTimeType = useCallback((value: any) => { dispatch(setCountryTimeType(value)); }, [dispatch]);

  const [countryChartSeries, setCountryChartSeries] = useState<any>([]);
  const [countryChartWarningMessage, setCountryChartWarningMessage] = useState('');

  useEffect(() => {
    if (!chartsData) {
      return;
    }

    if (!country || !country.value || !chartsData.totalDeaths[country.value] || !chartsData.totalCases[country.value]) {
      return;
    }

    const { series: countryChartSeries, warningMessage: countryChartWarningMessage } = getCountryChartSeries(chartsData, dataType, country.value, { timeType });
    setCountryChartSeries(countryChartSeries);
    setCountryChartWarningMessage(countryChartWarningMessage);
  }, [chartsData, country, dataType, timeType]);

  return (
    <Container fluid>
      <Row className="pb-3">
        <Col xs={5}>
          <Select
            value={country}
            options={countries.map((option) => ({ label: option, value: option }))}
            placeholder="Choose a Country"
            onChange={(value: any) => setCountry(value)}
          />
        </Col>
        <Col xs={5}>
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
          <div className="radio">
            <label>
              <input
                type="radio"
                value={DataType.NEW_CASES}
                checked={dataType === DataType.NEW_CASES}
                onChange={() => setDataType(DataType.NEW_CASES)}
              />
              New Cases
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value={DataType.NEW_DEATHS}
                checked={dataType === DataType.NEW_DEATHS}
                onChange={() => setDataType(DataType.NEW_DEATHS)}
              />
              New Deaths
            </label>
          </div>
        </Col>
        <Col xs={2}>
          <div className="radio">
            <label>
              <input
                type="radio"
                value={TimeType.DAILY}
                checked={timeType === TimeType.DAILY}
                onChange={() => setTimeType(TimeType.DAILY)}
              />
              Daily
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value={TimeType.WEEKLY}
                checked={timeType === TimeType.WEEKLY}
                onChange={() => setTimeType(TimeType.WEEKLY)}
              />
              Weekly
            </label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CountryChart series={countryChartSeries} title={countryChartSeries && countryChartSeries.length ? countryChartSeries[0].name : ''} />
          <small>{countryChartWarningMessage}</small>
        </Col>
      </Row>
    </Container>
  );
};

const getCountryChartSeries = (chartsData: ChartsData, dataType: DataType, country: string, { timeType }: { timeType: TimeType }) => {
  const columnSerie: ColumnSerie = {
    type: 'column',
    data: [],
    name: '',
    color: '',
  };
  const growthSerie = {
    name: 'Daily Growth Rate',
    color: '#FAB700',
    type: 'spline',
    data: [] as [number, number][],
    yAxis: 1,
    tooltip: {
      valueSuffix: '%',
      valueDecimals: 2,
    },
  };
  let warningMessage = '';

  if (dataType === DataType.TOTAL_DEATHS) {
    columnSerie.data = chartsData.totalDeaths[country].slice();
    columnSerie.name = 'Total Deaths';
    columnSerie.color = '#B71C1C';
  } else if (dataType === DataType.TOTAL_CASES) {
    columnSerie.data = chartsData.totalCases[country].slice();
    columnSerie.name = 'Total Cases';
    columnSerie.color = '#007bff';
  } else if (dataType === DataType.NEW_CASES && chartsData.newCases) {
    columnSerie.data = chartsData.newCases[country].slice();
    columnSerie.name = 'New Cases';
    columnSerie.color = '#90CAF9';
  } else if (dataType === DataType.NEW_DEATHS && chartsData.newDeaths) {
    columnSerie.data = chartsData.newDeaths[country].slice();
    columnSerie.name = 'New Deaths';
    columnSerie.color = '#E57373';
  }

  if (timeType === TimeType.WEEKLY) {
    const today = new Date().getUTCDay();
    const yesterdayWeekDay = today >= 1 ? today - 1 : 6;
    const timeFilter = serializeWeeklyFilter(yesterdayWeekDay);
    columnSerie.data = columnSerie.data.filter(timeFilter);
  }

  let lineGrowthReducer;

  if (country === 'World' && dataType === DataType.TOTAL_CASES) {
    lineGrowthReducer = serializeGrowthRateReducer(100000, columnSerie.data);
    warningMessage = serializeWarningMessage('total cases', 100000);
  } else if (country === 'World' && dataType === DataType.TOTAL_DEATHS) {
    lineGrowthReducer = serializeGrowthRateReducer(1000, columnSerie.data);
    warningMessage = serializeWarningMessage('total deaths', 1000);
  } else if (dataType === DataType.TOTAL_CASES) {
    lineGrowthReducer = serializeGrowthRateReducer(1000, columnSerie.data);
    warningMessage = serializeWarningMessage('total cases', 1000);
  } else {
    lineGrowthReducer = serializeGrowthRateReducer(100, columnSerie.data);
    warningMessage = serializeWarningMessage('total deaths', 100);
  }

  growthSerie.data = columnSerie
    .data
    .slice(1)
    .reduce(lineGrowthReducer, []);

  return {
    series: [
      columnSerie,
      growthSerie,
    ],
    warningMessage,
  };
};

const serializeWarningMessage = (occurenceType: string, lowerLimit: number) => `* The growth rate is tracked after the number of ${occurenceType} reaches ${formatNumber(lowerLimit)}.`;

const serializeWeeklyFilter = (weekDay: number) => ([time]: [number, number]) => new Date(time).getUTCDay() === weekDay;

const serializeGrowthRateReducer = (lowerLimit: number, serie: Array<[number, number]>) => (growthRates: Array<[number, number]>, [time, value]: [number, number], index: number) => {
  if (value >= lowerLimit) {
    const prev = serie[index][1];
    growthRates.push([time, calculateGrowthRate(prev, value)]);
  }
  return growthRates;
};

function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
