import { DataType, ReduxReducerState, TimeType } from '../types';
import actions from './actions';
import {
  RESET_STATE,
  SET_ALL_COUNTRIES_DATA_TYPE,
  SET_ALL_COUNTRIES_SELECTED,
  SET_ALL_REGIONS_DATA_TYPE,
  SET_ALL_REGIONS_SELECTED,
  SET_COUNTRY_DATA_TYPE,
  SET_COUNTRY_FILTER,
  SET_COUNTRY_TIME_TYPE,
  SET_REGION_DATA_TYPE,
  SET_REGION_FILTER,
  SET_REGION_TIME_TYPE,
  SET_TAB,
} from './types';


const initialState = {
  country: {
    label: 'World',
    value: 'World'
  },
  countryDataType: DataType.TOTAL_CASES,
  countryTimeType: TimeType.DAILY,
  allCountriesDataType: DataType.TOTAL_CASES,
  allCountriesSelected: [],

  region: {
    label: 'USA',
    value: 'USA'
  },
  regionDataType: DataType.TOTAL_CASES,
  regionTimeType: TimeType.DAILY,
  allRegionsDataType: DataType.TOTAL_CASES,
  allRegionsSelected: [],

  tab: 'country'
};

const setState = (state: ReduxReducerState, key: keyof ReduxReducerState, value: any) => ({
  ...state,
  [key]: value,
});

export default (state: any = initialState, action: actions) => {
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
  }

  return state;
};

