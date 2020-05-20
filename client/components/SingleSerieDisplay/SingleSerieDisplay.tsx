import { ChartsData, SelectOption } from '@common/types';
import Vote from 'client/components/SingleSerieDisplay/Vote';
import { DataType, TimeType } from 'client/types';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ValueType } from 'react-select';

import CountryChart from './ColumnChart';
import SingleSerieFilters from './SingleSerieFilters';
import useChartsDataBuilder from './useChartsDataBuilder';
import useGrowthAndPredictedValues from './useGrowthAndPredictedValues';
import useVote from './useVote';

export interface SingleSerieChartProps {
  selectedSerie: any;
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

  const [columnSerie] = useChartsDataBuilder(chartsData, dataType, timeType, selectedSerie ? selectedSerie.value : '');

  const {
    countryChartSeries,
    actualValue,
    nextPredictedValue
  } = useGrowthAndPredictedValues(columnSerie, timeType);

  const [voteCompleted, voteUp, voteDown] = useVote({
    timeType,
    dataType,
    resource: selectedSerie ? selectedSerie.value : ""
  });

  return (
    <Container fluid>
      <SingleSerieFilters
        selectedSerie={selectedSerie}
        seriesOptions={seriesOptions}
        changeSelectedSerie={changeSelectedSerie}

        dataType={dataType}
        changeDataType={changeDataType}

        timeType={timeType}
        changeTimeType={changeTimeType}
      />
      <Row>
        <Col xs={12} md={9}>
          <CountryChart series={countryChartSeries} title={countryChartSeries && countryChartSeries.length ? countryChartSeries[0].name : ''} />
        </Col>
        {
          selectedSerie && actualValue > 0 && nextPredictedValue > 0 &&
          <Col xs={12} md={3} className="mt-3 mt-md-0">
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
};
