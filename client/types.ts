export enum DataType {
  TOTAL_CASES,
  TOTAL_DEATHS,
  NEW_CASES,
  NEW_DEATHS
}

export enum TimeType {
  DAILY,
  WEEKLY
}

export const DataTypeLabels = {
  [DataType.TOTAL_CASES]: 'Total Cases',
  [DataType.TOTAL_DEATHS]: 'Total Deaths',
  [DataType.NEW_CASES]: 'New Cases',
  [DataType.NEW_DEATHS]: 'New Deaths',
}

export const TimeTypeLabels = {
  [TimeType.DAILY]: 'Daily',
  [TimeType.WEEKLY]: 'Weekly',
}

export interface ColumnSerie {
  type: 'column';
  name?: string;
  data: [number, number][];
  color?: string;
}


export interface PackedBubbleData {
  name: string;
  value?: number;
  data?: PackedBubbleData[];
}

export interface BubbleData {
  totalCases: PackedBubbleData[];
  totalDeaths: PackedBubbleData[];
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface ReduxReducerState {
  country: SelectOption;
  countryDataType: DataType;
  countryTimeType: TimeType;
  allCountriesDataType: DataType;
  allCountriesSelected: any;
  allCountriesFilter: any;

  region: SelectOption;
  regionDataType: DataType;
  regionTimeType: TimeType;
  allRegionsDataType: DataType;
  allRegionsSelected: any;
  allRegionsFilter: any;

  county: {
    singleSerie: {
      selected?: SelectOption;
      dataType: DataType;
      timeType: TimeType;
    };
    multipleSeries: {
      dataType: DataType;
      selected: SelectOption[];
      filter: any;
    };
  };

  tab: 'country' | 'usa';
}
