import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';

import AreaChart from '../components/AreaChart';
import { ChartsData } from '../services/ChartSerializer';
import PivotTable from './PivotTable';
import { DataType, ReduxReducerState } from '../types';
import { getAllCountriesDataType, getAllCountriesSelected } from '../redux/selectors';
import { setAllCountriesDataType, setAllCountriesSelected } from '../redux/actions';

interface CountriesComparisonContainerProps {
  chartsData: ChartsData,
  countries: string[],
  pivotData: any
}

export const parseChartsDataToHighchartsFormat = (chartsData: ChartsData, dataType: DataType) => {
  let data: any = {};

  switch (dataType) {
    case DataType.TOTAL_CASES:
      data = chartsData.totalCases;
      break;
    case DataType.NEW_CASES:
      data = chartsData.newCases;
      break;
    case DataType.TOTAL_DEATHS:
      data = chartsData.totalDeaths;
      break;
    case DataType.NEW_DEATHS:
      data = chartsData.newDeaths;
      break;
  }

  const series = Object
    .entries(data)
    .filter(([country]) => country !== 'World')
    .map(([country, values]: any) => ({
      name: country,
      data: values.slice(),
    }))

  return series;
}

const getTopTenCountries = (chartsData: ChartsData) => {
  return Object.entries(chartsData.totalCases)
    .map(([country, data]) => ([country, data[data.length - 1][1]]))
    .filter(([country]) => country !== 'World')
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 20)
    .map(a => a[0])
}


const getInitialFilters = (() => {
  let filters: any;

  return (chartsData: ChartsData) => {
    if (!filters) {
      const topTenCountries: any =
        Object.entries(chartsData.totalCases)
          .map(([country, data]) => ([country, data[data.length - 1][1]]))
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 20)
          .map(a => a[0])

      filters = Object.keys(chartsData.totalCases)
        .reduce((filter: any, country: string) => {
          if (!topTenCountries.includes(country)) {
            filter[country] = true;
          }

          return filter;
        }, {})
    }

    return filters;
  }
})()

export default ({ chartsData, countries, pivotData }: CountriesComparisonContainerProps) => {

  const dispatch = useDispatch();

  const [chartAllCountries, setChartAllCountries] = useState<any>(null);

  const dataType = useSelector(getAllCountriesDataType);
  const setDataType = useCallback((value: DataType) => {
    dispatch(setAllCountriesDataType(value))
  }, [dispatch])

  const countriesSelected = useSelector((state: ReduxReducerState) => {
    const result = getAllCountriesSelected(state);
    return result || getTopTenCountries(chartsData).map(country => ({ label: country, value: country }));
  });
  const setCountriesSelected = useCallback((value: any) => {
    dispatch(setAllCountriesSelected(value))
  }, [dispatch])

  const [allCountriesCharSeries, setAllCountriesChartSeries] = useState<any>([]);
  const [allCountriesFilter, setAllCountriesFilter] = useState<any>(getInitialFilters(chartsData))

  const chartAllCountriesSerieShow = function (country: string) {
    const filters = { ...allCountriesFilter }
    delete filters[country];

    setAllCountriesFilter(filters)
  }

  const chartAllCountriesSerieHide = function (country: string) {
    const filters = { [country]: true, ...allCountriesFilter }

    setAllCountriesFilter(filters);
  }

  const showAllCountries = () => {
    setCountriesSelected(Object.keys(chartsData.totalCases).map(country => ({ label: country, value: country })))
  }

  const hideAllCountries = () => {
    setCountriesSelected([]);
  }

  useEffect(() => {
    if (countriesSelected) {
      const allVisibleCountries = countriesSelected.reduce((final: any, option: any) => {
        final[option.value] = true;

        return final;
      }, {})

      const tableFilter =
        Object.keys(chartsData.totalCases)
          .filter(country => !allVisibleCountries[country])
          .reduce((final: any, country: string) => {
            final[country] = true;

            return final;
          }, {})

      setAllCountriesFilter(tableFilter)

      if (chartAllCountries) {
        chartAllCountries.series.forEach((serie: any) => {
          if (
            (allVisibleCountries[serie.name] && !serie.visible) ||
            (!allVisibleCountries[serie.name] && serie.visible)
          ) {
            serie.update({
              visible: !!allVisibleCountries[serie.name],
            }, false);
          }
        });

        chartAllCountries.redraw();
      }
    } else {

      const tableFilter =
        Object.keys(chartsData.totalCases)
          .reduce((final: any, country: string) => {
            final[country] = true;

            return final;
          }, {})

      setAllCountriesFilter(tableFilter)

      if (chartAllCountries) {
        chartAllCountries.series.forEach((serie: any) => {
          if (
            serie.visible
          ) {
            serie.update({
              visible: false,
            }, false);
          }
        });

        chartAllCountries.redraw();
      }
    }
  }, [chartAllCountries, chartsData.totalCases, countriesSelected])



  useEffect(() => {
    const allCountriesCharSeries = parseChartsDataToHighchartsFormat(chartsData, dataType);
    setAllCountriesChartSeries(allCountriesCharSeries);
  }, [chartAllCountries, chartsData, dataType])

  return (
    <Container fluid>
      <div style={{ backgroundColor: '#eee' }} className="pt-3 pb-3">
        <div className="mb-3">
          <div className="radio">
            <label>
              <input
                type="radio"
                value={DataType.TOTAL_CASES}
                checked={dataType === DataType.TOTAL_CASES}
                onChange={e => setDataType(DataType.TOTAL_CASES)}
              />
                  Cases
                </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value={DataType.TOTAL_DEATHS}
                checked={dataType === DataType.TOTAL_DEATHS}
                onChange={e => setDataType(DataType.TOTAL_DEATHS)}
              />
                Deaths
              </label>
          </div>
        </div>
        <Row>
          <Col xs={12}>
            <AreaChart
              chartCallback={setChartAllCountries}
              series={allCountriesCharSeries}
              onSerieShow={chartAllCountriesSerieShow}
              onSerieHide={chartAllCountriesSerieHide}
              options={{ legend: false }}
            />
          </Col>
        </Row>
        <div className="mb-3">
          <Select
            value={countriesSelected}
            options={countries.map(option => ({ label: option, value: option })).filter(({ value }) => value !== 'World')}
            placeholder="Choose a Country"
            onChange={(value: any) => setCountriesSelected(value)}
            isMulti
          />
        </div>
        <Row>
          <Col xs={3}>
            <div className="mb-3">
              <Button size="sm" onClick={showAllCountries}>Show all countries</Button>{' '}
              <Button size="sm" onClick={hideAllCountries}>Hide all countries</Button>
            </div>
          </Col>
          <Col xs={4}>
          </Col>
        </Row>
        {
          pivotData &&
          <div style={{ minHeight: 250 }} className="mb-5">
            <PivotTable
              vals={dataType === DataType.TOTAL_CASES ? ['New Cases'] : ['New Deaths']}
              onChangeFilter={setAllCountriesFilter}
              filter={allCountriesFilter}
              data={pivotData}
            />
          </div>
        }
      </div>
    </Container >
  );
}
