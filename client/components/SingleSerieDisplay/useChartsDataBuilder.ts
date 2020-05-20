import { ChartsData } from "@common/types";
import { ColumnSerie, DataType, TimeType } from "client/types";
import { useEffect, useState } from "react";

const serializeWeeklyFilter = (weekDay: number) => ([time]: [number, number]) => new Date(time).getUTCDay() === weekDay;

const buildColumnSerie = (chartsData: ChartsData, dataType: DataType, timeType: TimeType, country: string): ColumnSerie => {
  const columnSerie: ColumnSerie = {
    type: 'column',
    data: [],
    name: '',
    color: '',
  };

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

  return columnSerie;
};

export default (chartsData: ChartsData, dataType: DataType, timeType: TimeType, selectedSerie: string) => {
  const [columnSerie, setColumnSerie] = useState<ColumnSerie>();

  useEffect(() => {
    if (!chartsData || !(selectedSerie in chartsData.totalCases)) {
      return;
    }

    const columnSerie = buildColumnSerie(chartsData, dataType, timeType, selectedSerie);

    setColumnSerie(columnSerie);
  }, [chartsData, dataType, timeType, selectedSerie]);

  return [columnSerie];
};
