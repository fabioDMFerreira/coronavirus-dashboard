import convertToCountryId from "@common/convertToCountryId";
import { ColumnSerie, DataType, TimeType } from "client/types";
import fetch from "node-fetch";
import { useEffect, useState } from "react";

const serializeWeeklyFilter = (weekDay: number) => ([time]: [number, number]) => new Date(time).getUTCDay() === weekDay;

const buildColumnSerie = (serie: any, dataType: DataType, timeType: TimeType): ColumnSerie => {
  const columnSerie: ColumnSerie = {
    type: 'column',
    data: [],
    name: '',
    color: '',
  };

  if (dataType === DataType.TOTAL_DEATHS) {
    columnSerie.data = serie.totalDeaths.slice();
    columnSerie.name = 'Total Deaths';
    columnSerie.color = '#B71C1C';
  } else if (dataType === DataType.TOTAL_CASES) {
    columnSerie.data = serie.totalCases.slice();
    columnSerie.name = 'Total Cases';
    columnSerie.color = '#007bff';
  } else if (dataType === DataType.NEW_CASES && serie.newCases) {
    columnSerie.data = serie.newCases.slice();
    columnSerie.name = 'New Cases';
    columnSerie.color = '#90CAF9';
  } else if (dataType === DataType.NEW_DEATHS && serie.newDeaths) {
    columnSerie.data = serie.newDeaths.slice();
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

export default (dataType: DataType, timeType: TimeType, selectedSerie: string) => {
  const [columnSerie, setColumnSerie] = useState<ColumnSerie>();

  useEffect(() => {
    if (!selectedSerie) {
      return;
    }

    fetch(`/api/covid/countries/${convertToCountryId(selectedSerie)}/chartData`)
      .then(res => res.json())
      .then(serie => buildColumnSerie(serie, dataType, timeType))
      .then(setColumnSerie);

  }, [JSON.stringify({ dataType, timeType, selectedSerie })]);

  return [columnSerie];
};
