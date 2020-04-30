import { AvailableCountriesRegions } from '@common/availableCountriesRegions';

import getCountryChartData from './countries/getCountryChartData';
import getCountryPivotData from './countries/getCountryPivotData';
import getCountryRegionsChartData from './countries/getCountryRegionsChartData';
import getCountryRegionsPivotData from './countries/getCountryRegionsPivotData';
import covidProxy from './covid.proxy';
import covidRepository from './covid.repository';

export default {
  getCountriesData: () => {
    return covidProxy.getCountriesData();
  },

  getCountriesPivotData: () => {
    return covidProxy.getCountriesPivotData();
  },

  getUsaData: async () => {
    return covidProxy.getUsaChartsData();
  },

  getUsaPivotData: async () => {
    return covidProxy.getUsaPivotData();
  },

  getUsaRegionData: async (region: string) => {
    return covidProxy.getUsaRegionData(region);
  },

  getUsaRegionPivotData: async (region: string) => {
    return covidProxy.getUsaRegionPivotData(region);
  },

  getCountryChartsData: async (country: string) => {
    return getCountryChartData(country);
  },

  getCountryPivotData: async (country: string) => {
    return getCountryPivotData(country);
  },

  getCountryRegionsChartData: async (country: AvailableCountriesRegions) => {
    return getCountryRegionsChartData(country);
  },

  getCountryRegionsPivotData: async (country: AvailableCountriesRegions) => {
    return getCountryRegionsPivotData(country);
  },

  getCovidDataCountries: () => {
    return covidRepository.getDistinctCountries();
  }
};
