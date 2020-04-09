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

export interface ColumnSerie {
  type: 'column',
  name?: string,
  data: [number, number][]
  color?: string,
}


export interface PackedBubbleData {
  name: string
  value?: number
  data?: PackedBubbleData[]
}

export interface BubbleData {
  totalCases: PackedBubbleData[],
  totalDeaths: PackedBubbleData[]
}

export interface ReduxReducerState {
  country: { label: string, value: string },
  countryDataType: DataType,
  countryTimeType: TimeType,
  allCountriesDataType: DataType,
  allCountriesSelected: any,
  regionDataType: DataType
}
