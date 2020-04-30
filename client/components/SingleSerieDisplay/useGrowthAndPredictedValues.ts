import calculateGrowthRate from "@utils/calculateGrowthRate";
import { ColumnSerie, TimeType } from "client/types";
import { useEffect, useState } from "react";

import predictVelocity from "./predictVelocity";


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

const buildGrowthSerie = (columnSerie: ColumnSerie, timeType: TimeType) => {
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

  const growthTimeLimit = timeType === TimeType.WEEKLY ? 8 : 20;

  const lineGrowthReducer = serializeGrowthRateReducer(0, columnSerie.data.slice(-growthTimeLimit));

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
      growthSerie.data = growthSerie.data.slice(indexToCut);
    }
  }

  return growthSerie;
};

const getPredictedGrowth = (columnSerie: ColumnSerie) => {
  const lastFiveResults = columnSerie.data.slice(-5).map(([, value]) => value);

  const lastFiveVelocities =
    lastFiveResults
      .slice(1)
      .reduce((final: number[], value: number, index) => {
        return [
          ...final,
          value - lastFiveResults[index]
        ];
      }, []);

  const nextVelocity = predictVelocity(lastFiveVelocities);

  return Math.ceil(nextVelocity);
};

export default (columnSerie: ColumnSerie | undefined, timeType: TimeType) => {
  const [countryChartSeries, setCountryChartSeries] = useState<any>([]);
  const [actualValue, setActualValue] = useState<number>(0);
  const [nextPredictedValue, setNextPredictedValue] = useState<number>(0);

  useEffect(() => {
    if (!columnSerie || !columnSerie.data.length) {
      return;
    }

    const growthSerie = buildGrowthSerie(columnSerie, timeType);

    const actualValue = columnSerie.data[columnSerie.data.length - 1][1];
    const nextPredictedValue = actualValue + getPredictedGrowth(columnSerie);

    const countryChartSeries = [columnSerie, growthSerie];

    setCountryChartSeries(countryChartSeries);
    setActualValue(actualValue);
    setNextPredictedValue(nextPredictedValue);
  }, [columnSerie]);

  return {
    countryChartSeries,
    actualValue,
    nextPredictedValue
  };
};
