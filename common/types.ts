export interface EventsMap {
  [key: string]: Array<[number, number]>;
}

export interface ChartsData {
  totalCases: EventsMap;
  totalDeaths: EventsMap;
  newCases?: EventsMap;
  newDeaths?: EventsMap;
}

export interface SelectOption {
  label: string;
  value: string;
}
