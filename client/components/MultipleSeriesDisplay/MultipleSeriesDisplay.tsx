import { ChartsData } from 'client/services/ChartSerializer';
import { DataType } from 'client/types';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';

import AreaChart from '../AreaChart';
import PivotTable from './PivotTable';

export const parseChartsDataToHighchartsFormat = (chartsData: ChartsData, dataType: DataType, groupSerie: string) => {
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
    .filter(([country]) => country !== groupSerie)
    .map(([country, values]: any) => ({
      name: country,
      data: values.slice(),
    }));

  return series;
};

const getTopCountries = (chartsData: ChartsData, nSeries = 10, groupSerie: string) => Object.entries(chartsData.totalCases)
  .map(([country, data]) => ([country, data[data.length - 1][1]]))
  .filter(([country]) => country !== groupSerie)
  .sort((a: any, b: any) => b[1] - a[1])
  .slice(0, nSeries)
  .map((a) => a[0]);


const getInitialFilters = (() => {
  let filters: any;

  return (chartsData: ChartsData) => {
    if (!filters) {
      const topTenCountries: any = Object.entries(chartsData.totalCases)
        .map(([country, data]) => ([country, data[data.length - 1][1]]))
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 20)
        .map((a) => a[0]);

      filters = Object.keys(chartsData.totalCases)
        .reduce((filter: any, country: string) => {
          if (!topTenCountries.includes(country)) {
            filter[country] = true;
          }

          return filter;
        }, {});
    }

    return filters;
  };
})();

interface MultipleSeriesDisplayProps {
  dataType: DataType;
  changeDataType: (dataType: DataType) => void;

  chartsData: ChartsData;
  seriesOptions: string[];
  pivotData: any;

  seriesSelected: any;
  selectSeries: (value: any) => void;

  groupSerie: 'World' | 'USA';
  seriesType: 'Countries' | 'Regions';
}

export default ({
  dataType,
  changeDataType,
  chartsData,
  pivotData,
  seriesOptions,
  seriesSelected,
  selectSeries,
  groupSerie,
  seriesType,
}: MultipleSeriesDisplayProps) => {

  const [chartAllCountries, setChartAllCountries] = useState<any>(null);

  const [allCountriesCharSeries, setAllCountriesChartSeries] = useState<any>([]);
  const [allCountriesFilter, setAllCountriesFilter] = useState<any>(getInitialFilters(chartsData));

  useEffect(() => {
    if (seriesSelected) {
      const allVisibleCountries = seriesSelected.reduce((final: any, option: any) => {
        final[option.value] = true;

        return final;
      }, {});

      const tableFilter = Object.keys(chartsData.totalCases)
        .filter((country) => !allVisibleCountries[country])
        .reduce((final: any, country: string) => {
          final[country] = true;

          return final;
        }, {});

      setAllCountriesFilter(tableFilter);

      if (chartAllCountries) {
        chartAllCountries.series.forEach((serie: any) => {
          if (
            (allVisibleCountries[serie.name] && !serie.visible)
            || (!allVisibleCountries[serie.name] && serie.visible)
          ) {
            serie.update({
              visible: !!allVisibleCountries[serie.name],
            }, false);
          }
        });

        chartAllCountries.redraw();
      }
    } else {
      const tableFilter = Object.keys(chartsData.totalCases)
        .reduce((final: any, country: string) => {
          final[country] = true;

          return final;
        }, {});

      setAllCountriesFilter(tableFilter);

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
  }, [chartAllCountries, chartsData.totalCases, seriesSelected]);

  useEffect(() => {
    const allCountriesCharSeries = parseChartsDataToHighchartsFormat(chartsData, dataType, groupSerie);
    setAllCountriesChartSeries(allCountriesCharSeries);
  }, [chartAllCountries, chartsData, dataType]);

  useEffect(() => {
    if (!seriesSelected || !seriesSelected.length) {
      const seriesSelected = getTopCountries(chartsData, 10, groupSerie).map((country) => ({ label: country, value: country }));
      selectSeries(seriesSelected);
    }
  }, [])

  const showTopTenSeries = () => {
    const seriesSelected = getTopCountries(chartsData, 10, groupSerie).map((country) => ({ label: country, value: country }))
    selectSeries(seriesSelected);
  };

  const showTopTwentySeries = () => {
    const seriesSelected = getTopCountries(chartsData, 20, groupSerie).map((country) => ({ label: country, value: country }))
    selectSeries(seriesSelected);
  }

  const showAllSeries = () => {
    selectSeries(Object.keys(chartsData.totalCases).map((country) => ({ label: country, value: country })));
  };

  const hideAllSeries = () => {
    selectSeries([]);
  };

  return (
    <Container fluid>
      <div className="pt-3 pb-3">
        <div className="mb-3">
          <div className="radio">
            <label>
              <input
                type="radio"
                value={DataType.TOTAL_CASES}
                checked={dataType === DataType.TOTAL_CASES}
                onChange={() => changeDataType(DataType.TOTAL_CASES)}
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
                onChange={() => changeDataType(DataType.TOTAL_DEATHS)}
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
              options={{ legend: false }}
            />
          </Col>
        </Row>
        <div className="mb-3">
          <Select
            value={seriesSelected}
            options={seriesOptions.map((option) => ({ label: option, value: option })).filter(({ value }) => value !== groupSerie)}
            placeholder="Choose a Country"
            onChange={(value: any) => selectSeries(value)}
            isMulti
          />
        </div>
        <Row>
          <Col xs={12}>
            <div className="mb-3">
              <Button size="sm" onClick={showTopTenSeries}>Show Top Ten {seriesType}</Button>
              {' '}
              <Button size="sm" onClick={showTopTwentySeries}>Show Top Twenty {seriesType}</Button>
              {' '}
              <Button size="sm" onClick={showAllSeries}>Show All {seriesType}</Button>
              {' '}
              <Button size="sm" onClick={hideAllSeries}>Hide all {seriesType}</Button>
            </div>
          </Col>
        </Row>
        {
          pivotData
          && (
            <div style={{ minHeight: 250 }} className="mb-5">
              <PivotTable
                vals={dataType === DataType.TOTAL_CASES ? ['New Cases'] : ['New Deaths']}
                onChangeFilter={setAllCountriesFilter}
                filter={allCountriesFilter}
                data={pivotData}
              />
            </div>
          )
        }
      </div>
    </Container>
  )
}
