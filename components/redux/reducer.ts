import actions from "./actions";
import { SET_COUNTRY_FILTER, SET_COUNTRY_DATA_TYPE, SET_COUNTRY_TIME_TYPE, RESET_STATE, SET_ALL_COUNTRIES_DATA_TYPE, SET_ALL_COUNTRIES_SELECTED, SET_REGION_DATA_TYPE } from "./types";
import { DataType, TimeType, ReduxReducerState } from "../types";


const initialState = {
  country: { label: 'World', value: 'World' },
  countryDataType: DataType.TOTAL_CASES,
  countryTimeType: TimeType.DAILY,
  allCountriesDataType: DataType.TOTAL_CASES,
  regionDataType: DataType.TOTAL_CASES
}

export default (state: any = initialState, action: actions) => {

  switch (action.type) {
    case SET_COUNTRY_FILTER: {
      return setState(state, 'country', action.payload)
    }
    case SET_COUNTRY_DATA_TYPE: {
      return setState(state, 'countryDataType', action.payload)
    }
    case SET_COUNTRY_TIME_TYPE: {
      return setState(state, 'countryTimeType', action.payload)
    }
    case RESET_STATE: {
      return action.payload || initialState;
    }
    case SET_ALL_COUNTRIES_DATA_TYPE: {
      return setState(state, 'allCountriesDataType', action.payload);
    }
    case SET_ALL_COUNTRIES_SELECTED: {
      return setState(state, 'allCountriesSelected', action.payload);
    }
    case SET_REGION_DATA_TYPE: {
      return setState(state, 'regionDataType', action.payload);
    }
  }

  return state;
}

const setState = (state: ReduxReducerState, key: keyof ReduxReducerState, value: any) => ({
  ...state,
  [key]: value
})
