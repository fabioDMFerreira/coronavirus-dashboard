import Vote from 'client/components/SingleSerieDisplay/Vote';
import { ColumnSerie, DataType, TimeType } from 'client/types';
import fetch from 'isomorphic-unfetch';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Select, { ValueType } from 'react-select';

import CountryChart from './ColumnChart';
import predictVelocity from './predictVelocity';
import calculateGrowthRate from '@utils/calculateGrowthRate';
import { ChartsData } from '@common/types';

// function formatNumber(num: number) {
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
// }

// const serializeWarningMessage = (occurenceType: string, lowerLimit: number) => `* The growth rate is tracked after the number of ${occurenceType} reaches ${formatNumber(lowerLimit)}.`;

const serializeWeeklyFilter = (weekDay: number) => ([time]: [number, number]) => new Date(time).getUTCDay() === weekDay;

const serializeGrowthRateReducer =
  (lowerLimit: number, serie: Array<[number, number]>) =>
    (
      growthRates: Array<[number, number]>,
      [time, value]: [number, number],
      index: number
    ) => {
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
  const warningMessage = '';

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

  const growthTimeLimit = timeType === TimeType.WEEKLY ? 8 : 20

  const lineGrowthReducer = serializeGrowthRateReducer(0, columnSerie.data.slice(-growthTimeLimit));

  // if (country === 'World' && dataType === DataType.TOTAL_CASES) {
  //   lineGrowthReducer = serializeGrowthRateReducer(100000, columnSerie.data);
  //   warningMessage = serializeWarningMessage('total cases', 100000);
  // } else if (country === 'World' && dataType === DataType.TOTAL_DEATHS) {
  //   lineGrowthReducer = serializeGrowthRateReducer(1000, columnSerie.data);
  //   warningMessage = serializeWarningMessage('total deaths', 1000);
  // } else if (dataType === DataType.TOTAL_CASES) {
  //   lineGrowthReducer = serializeGrowthRateReducer(1000, columnSerie.data);
  //   warningMessage = serializeWarningMessage('total cases', 1000);
  // } else {
  //   lineGrowthReducer = serializeGrowthRateReducer(100, columnSerie.data);
  //   warningMessage = serializeWarningMessage('total deaths', 100);
  // }

  growthSerie.data = columnSerie
    .data
    .slice(-growthTimeLimit + 1)
    .reduce(lineGrowthReducer, []);

  if (timeType === TimeType.DAILY) {
    let indexToCut = -1;
    for (let i = 0; i < growthSerie.data.length; i++) {
      const index = growthSerie.data.length - i - 1;

      if (growthSerie.data[index][1] > 200) {
        indexToCut = index + 1;
        break;
      }
    }

    if (indexToCut >= 0) {
      growthSerie.data = growthSerie.data.slice(indexToCut)
    }
  }

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


interface SelectOption {
  label: string;
  value: string;
}

export interface SingleSerieChartProps {
  selectedSerie: SelectOption;
  changeSelectedSerie: (value: ValueType<SelectOption>) => void;
  seriesOptions: string[];

  dataType: DataType;
  changeDataType: (value: DataType) => void;

  timeType: TimeType;
  changeTimeType: (value: TimeType) => void;

  chartsData: ChartsData;
}

export default ({
  selectedSerie,
  changeSelectedSerie,
  seriesOptions,

  dataType,
  changeDataType,

  timeType,
  changeTimeType,

  chartsData
}: SingleSerieChartProps) => {

  const [countryChartSeries, setCountryChartSeries] = useState<any>([]);
  // const [
  //   countryChartWarningMessage,
  //   setCountryChartWarningMessage
  // ] = useState('');
  const [actualValue, setActualValue] = useState<number>(0);
  const [nextPredictedValue, setNextPredictedValue] = useState<number>(0);
  const [voteCompleted, setVoteCompleted] = useState(false);

  useEffect(() => {
    if (!chartsData) {
      return;
    }

    if (!selectedSerie || !selectedSerie.value || !chartsData.totalDeaths[selectedSerie.value] || !chartsData.totalCases[selectedSerie.value]) {
      return;
    }

    const { series: countryChartSeries, actualValue, nextPredictedValue } = getCountryChartSeries(chartsData, dataType, selectedSerie.value, { timeType });
    setCountryChartSeries(countryChartSeries);
    // setCountryChartWarningMessage(countryChartWarningMessage);
    setActualValue(actualValue);
    setNextPredictedValue(nextPredictedValue);
    setVoteCompleted(false);
  }, [chartsData, selectedSerie, dataType, timeType]);

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
          country: selectedSerie.value
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
            value={selectedSerie}
            options={seriesOptions.map((option) => ({ label: option, value: option }))}
            placeholder="Choose a Country"
            onChange={changeSelectedSerie}
          />
        </Col>
        <Col xs={5}>
          <div className="radio">
            <label>
              <input
                type="radio"
                value={DataType.TOTAL_CASES}
                checked={dataType === DataType.TOTAL_CASES}
                onChange={() => changeDataType(DataType.TOTAL_CASES)}
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
                onChange={() => changeDataType(DataType.TOTAL_DEATHS)}
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
                onChange={() => changeDataType(DataType.NEW_CASES)}
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
                onChange={() => changeDataType(DataType.NEW_DEATHS)}
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
                onChange={() => changeTimeType(TimeType.DAILY)}
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
                onChange={() => changeTimeType(TimeType.WEEKLY)}
              />
              Weekly
            </label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={9}>
          <CountryChart series={countryChartSeries} title={countryChartSeries && countryChartSeries.length ? countryChartSeries[0].name : ''} />
          {/* <small>* The growth rate is tracked after two weeks ago from now.</small> */}
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

              dataType={dataType}
              timeType={timeType}
              serieName={selectedSerie.value}
            />
          </Col>
        }
      </Row>
    </Container>
  );
}
