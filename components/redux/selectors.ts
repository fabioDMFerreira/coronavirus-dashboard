import { ReduxReducerState } from "../types"

export const getCountry = (state: ReduxReducerState) => state.country
export const getCountryDataType = (state: ReduxReducerState) => state.countryDataType
export const getCountryTimeType = (state: ReduxReducerState) => state.countryTimeType
export const getAllCountriesDataType = (state: ReduxReducerState) => state.allCountriesDataType
export const getAllCountriesSelected = (state: ReduxReducerState) => state.allCountriesSelected
export const getRegionDataType = (state: ReduxReducerState) => state.regionDataType
