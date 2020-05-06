import ColumnChart from '@components/SingleSerieDisplay/ColumnChart';
import SingleSerieFilters from '@components/SingleSerieDisplay/SingleSerieFilters';
import useGrowthAndPredictedValues from '@components/SingleSerieDisplay/useGrowthAndPredictedValues';
import useVote from '@components/SingleSerieDisplay/useVote';
import Vote from '@components/SingleSerieDisplay/Vote';
import fetch from 'node-fetch';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';

import { setCountryDataType, setCountryFilter, setCountryTimeType } from '../../redux/actions';
import { getCountry, getCountryDataType, getCountryTimeType } from '../../redux/selectors';
import useLazyCountryColumnSerieBuilder from './useLazyCountryColumnSerieBuilder';


export default () => {

  const chart = useRef(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('/api/covid/countries')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  const dispatch = useDispatch();

  const selectedSerie = useSelector(getCountry);
  const changeSelectedSerie = useCallback((value: any) => { dispatch(setCountryFilter(value)); }, [dispatch]);

  const dataType = useSelector(getCountryDataType);
  const changeDataType = useCallback((value: any) => { dispatch(setCountryDataType(value)); }, [dispatch]);

  const timeType = useSelector(getCountryTimeType);
  const changeTimeType = useCallback((value: any) => { dispatch(setCountryTimeType(value)); }, [dispatch]);

  const [columnSerie] =
    useLazyCountryColumnSerieBuilder(
      dataType,
      timeType,
      selectedSerie ? selectedSerie.value : "",
      chart
    );

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
        seriesOptions={countries}
        changeSelectedSerie={changeSelectedSerie}

        dataType={dataType}
        changeDataType={changeDataType}

        timeType={timeType}
        changeTimeType={changeTimeType}
      />
      <Row>
        <Col xs={12} md={9}>
          <ColumnChart
            series={countryChartSeries}
            title={countryChartSeries && countryChartSeries.length ? countryChartSeries[0].name : ''}
            ref={chart}
          />
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
