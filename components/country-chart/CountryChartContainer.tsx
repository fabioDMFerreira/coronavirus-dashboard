import Vote from 'components/components/Vote';
import fetch from 'isomorphic-unfetch';
import React, { useCallback, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { setCountryDataType, setCountryFilter, setCountryTimeType } from '../redux/actions';
import { getCountry, getCountryDataType, getCountryTimeType } from '../redux/selectors';
import { calculateGrowthRate, ChartsData } from '../services/ChartSerializer';
import { ColumnSerie, DataType, TimeType } from '../types';
import CountryChart from './CountryChart';
import predictVelocity from './predictVelocity';

interface CountryChartContainerProps {
  chartsData: ChartsData;
  countries: string[];
}

function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const serializeWarningMessage = (occurenceType: string, lowerLimit: number) => `* The growth rate is tracked after the number of ${occurenceType} reaches ${formatNumber(lowerLimit)}.`;

const serializeWeeklyFilter = (weekDay: number) => ([time]: [number, number]) => new Date(time).getUTCDay() === weekDay;

const serializeGrowthRateReducer = (lowerLimit: number, serie: Array<[number, number]>) => (growthRates: Array<[number, number]>, [time, value]: [number, number], index: number) => {
  if (value >= lowerLimit) {
    const prev = serie[index][1];
    growthRates.push([time, calculateGrowthRate(prev, value)]);
  }
  return growthRates;
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

  const lastFiveResults = columnSerie.data.slice(-5).map(([, value]) => value)

  const lastFiveVelocities =
    lastFiveResults
      .slice(1)
      .reduce((final: number[], value: number, index) => {
        return [
          ...final,
          value - lastFiveResults[index]
        ]
      }, []);

  const nextVelocity = predictVelocity(lastFiveVelocities);

  const actualValue = columnSerie.data[columnSerie.data.length - 1][1]
  const nextPredictedValue = actualValue + Math.ceil(nextVelocity);

  return {
    series: [
      columnSerie,
      growthSerie,
    ],
    warningMessage,
    actualValue,
    nextPredictedValue
  };
};


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
  const [actualValue, setActualValue] = useState<number>(0);
  const [nextPredictedValue, setNextPredictedValue] = useState<number>(0);
  const [voteCompleted, setVoteCompleted] = useState(false);

  useEffect(() => {
    if (!chartsData) {
      return;
    }

    if (!country || !country.value || !chartsData.totalDeaths[country.value] || !chartsData.totalCases[country.value]) {
      return;
    }

    const { series: countryChartSeries, warningMessage: countryChartWarningMessage, actualValue, nextPredictedValue } = getCountryChartSeries(chartsData, dataType, country.value, { timeType });
    setCountryChartSeries(countryChartSeries);
    setCountryChartWarningMessage(countryChartWarningMessage);
    setActualValue(actualValue);
    setNextPredictedValue(nextPredictedValue);
    setVoteCompleted(false);
  }, [chartsData, country, dataType, timeType]);

  const vote = async (type: boolean) => {
    await fetch('/api/votes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        state: {
          timeType,
          dataType,
          country: country.value
        }
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setVoteCompleted(true);
        }
      })
      .catch(_err => {
        // TODO:
      })

  }

  const voteUp = () => {
    vote(true);
  }

  const voteDown = () => {
    vote(false);
  }

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
        <Col xs={12} md={9}>
          <CountryChart series={countryChartSeries} title={countryChartSeries && countryChartSeries.length ? countryChartSeries[0].name : ''} />
          <small>{countryChartWarningMessage}</small>
        </Col>
        {
          actualValue > 0 && nextPredictedValue > 0 &&
          <Col xs={12} md={3}>
            <Vote
              actualValue={actualValue}
              nextPredictedValue={nextPredictedValue}
              voteUp={voteUp}
              voteDown={voteDown}
              completed={voteCompleted}
            />
          </Col>
        }
      </Row>
    </Container>
  );
};
