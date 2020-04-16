import { DataType, ReduxReducerState, TimeType } from '../types';
import actions from './actions';
import {
  RESET_STATE,
  SET_ALL_COUNTIES_DATA_TYPE,
  SET_ALL_COUNTIES_FILTER,
  SET_ALL_COUNTIES_SELECTED,
  SET_ALL_COUNTRIES_DATA_TYPE,
  SET_ALL_COUNTRIES_FILTER,
  SET_ALL_COUNTRIES_SELECTED,
  SET_ALL_REGIONS_DATA_TYPE,
  SET_ALL_REGIONS_FILTER,
  SET_ALL_REGIONS_SELECTED,
  SET_COUNTRY_DATA_TYPE,
  SET_COUNTRY_FILTER,
  SET_COUNTRY_TIME_TYPE,
  SET_COUNTY_DATA_TYPE,
  SET_COUNTY_FILTER,
  SET_COUNTY_TIME_TYPE,
  SET_REGION_DATA_TYPE,
  SET_REGION_FILTER,
  SET_REGION_TIME_TYPE,
  SET_TAB,
} from './types';


const initialState: ReduxReducerState = {
  country: {
    label: 'World',
    value: 'World'
  },
  countryDataType: DataType.TOTAL_CASES,
  countryTimeType: TimeType.DAILY,
  allCountriesDataType: DataType.TOTAL_CASES,
  allCountriesSelected: [],
  allCountriesFilter: {},

  region: {
    label: 'USA',
    value: 'USA'
  },
  regionDataType: DataType.TOTAL_CASES,
  regionTimeType: TimeType.DAILY,
  allRegionsDataType: DataType.TOTAL_CASES,
  allRegionsSelected: [],
  allRegionsFilter: {},

  county: {
    singleSerie: {
      dataType: DataType.TOTAL_CASES,
      timeType: TimeType.DAILY,
    },
    multipleSeries: {
      dataType: DataType.TOTAL_CASES,
      selected: [],
      filter: {}
    }
  },

  tab: 'country'
};

const setState = (state: ReduxReducerState, key: keyof ReduxReducerState, value: any) => ({
  ...state,
  [key]: value,
});

const setChartState = (state: ReduxReducerState, stateKey: keyof ReduxReducerState, chartKey: "singleSerie" | "multipleSeries", key: any, value: any) => ({
  ...state,
  [stateKey]: {
    ...state[stateKey],
    [chartKey]: {
      ...state[stateKey][chartKey],
      [key]: value
    }
  }
})

export default (state: ReduxReducerState = initialState, action: actions) => {
  switch (action.type) {
    case SET_TAB: {
      return setState(state, 'tab', action.payload)
    }
    case RESET_STATE: {
      return action.payload || initialState;
    }
    //
    case SET_COUNTRY_FILTER: {
      return setState(state, 'country', action.payload);
    }
    case SET_COUNTRY_DATA_TYPE: {
      return setState(state, 'countryDataType', action.payload);
    }
    case SET_COUNTRY_TIME_TYPE: {
      return setState(state, 'countryTimeType', action.payload);
    }
    case SET_ALL_COUNTRIES_DATA_TYPE: {
      return setState(state, 'allCountriesDataType', action.payload);
    }
    case SET_ALL_COUNTRIES_SELECTED: {
      return setState(state, 'allCountriesSelected', action.payload);
    }
    case SET_ALL_COUNTRIES_FILTER: {
      return setState(state, 'allCountriesFilter', action.payload);
    }
    //
    case SET_REGION_DATA_TYPE: {
      return setState(state, 'regionDataType', action.payload);
    }
    case SET_REGION_TIME_TYPE: {
      return setState(state, 'regionTimeType', action.payload);
    }
    case SET_REGION_FILTER: {
      return setState(state, 'region', action.payload);
    }
    case SET_ALL_REGIONS_DATA_TYPE: {
      return setState(state, 'allRegionsDataType', action.payload);
    }
    case SET_ALL_REGIONS_SELECTED: {
      return setState(state, 'allRegionsSelected', action.payload)
    }
    case SET_ALL_REGIONS_FILTER: {
      return setState(state, 'allRegionsFilter', action.payload);
    }
    //
    case SET_COUNTY_DATA_TYPE: {
      return setChartState(state, "county", "singleSerie", "dataType", action.payload)
    }
    case SET_COUNTY_TIME_TYPE: {
      return setChartState(state, "county", "singleSerie", "timeType", action.payload)
    }
    case SET_COUNTY_FILTER: {
      return setChartState(state, "county", "singleSerie", "selected", action.payload)
    }
    case SET_ALL_COUNTIES_DATA_TYPE: {
      return setChartState(state, "county", "multipleSeries", "dataType", action.payload)
    }
    case SET_ALL_COUNTIES_SELECTED: {
      return setChartState(state, "county", "multipleSeries", "selected", action.payload)
    }
    case SET_ALL_COUNTIES_FILTER: {
      return setChartState(state, "county", "multipleSeries", "filter", action.payload)
    }
  }

  return state;
};

