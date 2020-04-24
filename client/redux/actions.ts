import {
  DataType,
  ReduxReducerState,
  TimeType
} from '../types';
import {
  RESET_STATE,
  SET_ALL_COUNTIES_DATA_TYPE,
  SET_ALL_COUNTIES_FILTER, SET_ALL_COUNTIES_SELECTED,
  SET_ALL_COUNTRIES_DATA_TYPE,
  SET_ALL_COUNTRIES_FILTER,
  SET_ALL_COUNTRIES_SELECTED,
  SET_ALL_COUNTRY_REGIONS_FILTER,  SET_ALL_COUNTRY_REGIONS_SELECTED,
  SET_ALL_REGIONS_DATA_TYPE,
  SET_ALL_REGIONS_FILTER,
  SET_ALL_REGIONS_SELECTED,
  SET_COUNTRY_DATA_TYPE,
  SET_COUNTRY_FILTER,
  SET_COUNTRY_REGION_DATA_TYPE,
  SET_COUNTRY_REGION_FILTER,
  SET_COUNTRY_REGION_TIME_TYPE,  SET_COUNTRY_TIME_TYPE,
  SET_COUNTY_DATA_TYPE,
  SET_COUNTY_FILTER,
  SET_COUNTY_TIME_TYPE,
  SET_REGION_DATA_TYPE,
  SET_REGION_FILTER,
  SET_REGION_TIME_TYPE,
  SET_TAB
} from './types';

export const resetState = (payload: ReduxReducerState) => ({
  type: RESET_STATE,
  payload,
});

export const setTab = (payload: 'country' | 'tab') => ({
  type: SET_TAB,
  payload
});

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


/** County Actions */
export const setCountyFilter = (payload: { label: string; value: string }) => ({
  type: SET_COUNTY_FILTER,
  payload,
});

export const setCountyDataType = (payload: DataType) => ({
  type: SET_COUNTY_DATA_TYPE,
  payload,
});

export const setCountyTimeType = (payload: TimeType) => ({
  type: SET_COUNTY_TIME_TYPE,
  payload,
});


export const setAllCountiesSelected = (payload: any) => ({
  type: SET_ALL_COUNTIES_SELECTED,
  payload,
});

export const setAllCountiesDataType = (payload: DataType) => ({
  type: SET_ALL_COUNTIES_DATA_TYPE,
  payload,
});

export const setAllCountiesFilter = (payload: any) => ({
  type: SET_ALL_COUNTIES_FILTER,
  payload,
});

/** Country Region Actions */
export const setCountryRegionFilter = (payload: { label: string; value: string }) => ({
  type: SET_COUNTRY_REGION_FILTER,
  payload,
});

export const setCountryRegionDataType = (payload: DataType) => ({
  type: SET_COUNTRY_REGION_DATA_TYPE,
  payload,
});

export const setCountryRegionTimeType = (payload: TimeType) => ({
  type: SET_COUNTRY_REGION_TIME_TYPE,
  payload,
});


export const setAllCountryRegionsSelected = (payload: any) => ({
  type: SET_ALL_COUNTRY_REGIONS_SELECTED,
  payload,
});

export const setAllCountryRegionsDataType = (payload: DataType) => ({
  type: SET_ALL_COUNTRIES_DATA_TYPE,
  payload,
});

export const setAllCountryRegionsFilter = (payload: any) => ({
  type: SET_ALL_COUNTRY_REGIONS_FILTER,
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
  ReturnType<typeof setAllRegionsFilter> |
  //
  ReturnType<typeof setCountyFilter> |
  ReturnType<typeof setCountyDataType> |
  ReturnType<typeof setCountyTimeType> |
  ReturnType<typeof setAllCountiesSelected> |
  ReturnType<typeof setAllCountiesDataType> |
  ReturnType<typeof setAllCountiesFilter>;

export default actions;
