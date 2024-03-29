import { ReduxReducerState } from '../types';

export const getTab = (state: ReduxReducerState) => state.tab;
//
export const getCountry = (state: ReduxReducerState) => state.country;
export const getCountryDataType = (state: ReduxReducerState) => state.countryDataType;
export const getCountryTimeType = (state: ReduxReducerState) => state.countryTimeType;
export const getAllCountriesDataType = (state: ReduxReducerState) => state.allCountriesDataType;
export const getAllCountriesSelected = (state: ReduxReducerState) => state.allCountriesSelected;
export const getAllCountriesFilter = (state: ReduxReducerState) => state.allCountriesFilter;

//
export const getRegion = (state: ReduxReducerState) => state.region;
export const getRegionDataType = (state: ReduxReducerState) => state.regionDataType;
export const getRegionTimeType = (state: ReduxReducerState) => state.regionTimeType;
export const getAllRegionsDataType = (state: ReduxReducerState) => state.allRegionsDataType;
export const getAllRegionsSelected = (state: ReduxReducerState) => state.allRegionsSelected;
export const getAllRegionsFilter = (state: ReduxReducerState) => state.allRegionsFilter;

//
export const getUsaCounty = (state: ReduxReducerState) => state.county.singleSerie.selected;
export const getUsaCountyDataType = (state: ReduxReducerState) => state.county.singleSerie.dataType;
export const getUsaCountyTimeType = (state: ReduxReducerState) => state.county.singleSerie.timeType;
export const getAllUsaCountiesDataType = (state: ReduxReducerState) => state.county.multipleSeries.dataType;
export const getAllUsaCountiesSelected = (state: ReduxReducerState) => state.county.multipleSeries.selected;
export const getAllUsaCountiesFilter = (state: ReduxReducerState) => state.county.multipleSeries.filter;

//
export const getCountryRegion = (state: ReduxReducerState) => state.countryRegion.singleSerie.selected;
export const getCountryRegionDataType = (state: ReduxReducerState) => state.countryRegion.singleSerie.dataType;
export const getCountryRegionTimeType = (state: ReduxReducerState) => state.countryRegion.singleSerie.timeType;
export const getAllCountryRegionsDataType = (state: ReduxReducerState) => state.countryRegion.multipleSeries.dataType;
export const getAllCountryRegionsSelected = (state: ReduxReducerState) => state.countryRegion.multipleSeries.selected;
export const getAllCountryRegionsFilter = (state: ReduxReducerState) => state.countryRegion.multipleSeries.filter;
