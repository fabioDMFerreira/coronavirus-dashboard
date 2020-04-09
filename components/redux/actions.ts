import { DataType, ReduxReducerState,TimeType } from '../types';
import {
  RESET_STATE, SET_ALL_COUNTRIES_DATA_TYPE, SET_ALL_COUNTRIES_SELECTED, SET_COUNTRY_DATA_TYPE,   SET_COUNTRY_FILTER, SET_COUNTRY_TIME_TYPE, SET_REGION_DATA_TYPE,
} from './types';

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

export const resetState = (payload: ReduxReducerState) => ({
  type: RESET_STATE,
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

export const setRegionDataType = (payload: DataType) => ({
  type: SET_REGION_DATA_TYPE,
  payload,
});

type actions =
  ReturnType<typeof setCountryFilter> |
  ReturnType<typeof setCountryDataType> |
  ReturnType<typeof setCountryTimeType> |
  ReturnType<typeof resetState> |
  ReturnType<typeof setAllCountriesDataType> |
  ReturnType<typeof setAllCountriesSelected>;


export default actions;
