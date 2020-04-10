import { ReduxReducerState } from '../types';

export const getTab = (state: ReduxReducerState) => state.tab;
//
export const getCountry = (state: ReduxReducerState) => state.country;
export const getCountryDataType = (state: ReduxReducerState) => state.countryDataType;
export const getCountryTimeType = (state: ReduxReducerState) => state.countryTimeType;
export const getAllCountriesDataType = (state: ReduxReducerState) => state.allCountriesDataType;
export const getAllCountriesSelected = (state: ReduxReducerState) => state.allCountriesSelected;

//
export const getRegion = (state: ReduxReducerState) => state.region;
export const getRegionDataType = (state: ReduxReducerState) => state.regionDataType;
export const getRegionTimeType = (state: ReduxReducerState) => state.regionTimeType;
export const getAllRegionsDataType = (state: ReduxReducerState) => state.allRegionsDataType;
export const getAllRegionsSelected = (state: ReduxReducerState) => state.allRegionsSelected;
