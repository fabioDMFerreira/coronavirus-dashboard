import {
  DataType,
  ReduxReducerState,
  TimeType
} from '../types';
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
  SET_ALL_COUNTRIES_FILTER,
  SET_ALL_REGIONS_FILTER
} from './types';

export const resetState = (payload: ReduxReducerState) => ({
  type: RESET_STATE,
  payload,
});

export const setTab = (payload: 'country' | 'tab') => ({
  type: SET_TAB,
  payload
})

/** Country Actions */
export const setCountryFilter = (payload: { label: string; value: string }) => ({
  type: SET_COUNTRY_FILTER,
  payload,
});

export const setCountryDataType = (payload: DataType) => ({
  type: SET_COUNTRY_DATA_TYPE,
  payload,
});

export const setCountryTimeType = (payload: TimeType) => ({
  type: SET_COUNTRY_TIME_TYPE,
  payload,
});


export const setAllCountriesDataType = (payload: DataType) => ({
  type: SET_ALL_COUNTRIES_DATA_TYPE,
  payload,
});

export const setAllCountriesSelected = (payload: any) => ({
  type: SET_ALL_COUNTRIES_SELECTED,
  payload,
});

export const setAllCountriesFilter = (payload: any) => ({
  type: SET_ALL_COUNTRIES_FILTER,
  payload,
});

/** Region Actions */

export const setRegionFilter = (payload: { label: string; value: string }) => ({
  type: SET_REGION_FILTER,
  payload,
});

export const setRegionDataType = (payload: DataType) => ({
  type: SET_REGION_DATA_TYPE,
  payload,
});

export const setRegionTimeType = (payload: TimeType) => ({
  type: SET_REGION_TIME_TYPE,
  payload,
});


export const setAllRegionsSelected = (payload: any) => ({
  type: SET_ALL_REGIONS_SELECTED,
  payload,
});

export const setAllRegionsDataType = (payload: DataType) => ({
  type: SET_ALL_REGIONS_DATA_TYPE,
  payload,
});

export const setAllRegionsFilter = (payload: any) => ({
  type: SET_ALL_REGIONS_FILTER,
  payload,
});

type actions =
  ReturnType<typeof setTab> |
  ReturnType<typeof resetState> |
  //
  ReturnType<typeof setCountryFilter> |
  ReturnType<typeof setCountryDataType> |
  ReturnType<typeof setCountryTimeType> |
  ReturnType<typeof setAllCountriesSelected> |
  ReturnType<typeof setAllCountriesDataType> |
  ReturnType<typeof setAllCountriesFilter> |
  //
  ReturnType<typeof setRegionFilter> |
  ReturnType<typeof setRegionDataType> |
  ReturnType<typeof setRegionTimeType> |
  ReturnType<typeof setAllRegionsSelected> |
  ReturnType<typeof setAllRegionsDataType> |
  ReturnType<typeof setAllRegionsFilter>;

export default actions;
