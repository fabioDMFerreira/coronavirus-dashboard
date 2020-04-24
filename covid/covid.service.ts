import { AvailableCountriesRegions } from '@common/availableCountriesRegions';

import getCountryRegionsChartData from './countries/getCountryRegionsChartData';
import getCountryRegionsPivotData from './countries/getCountryRegionsPivotData';
import covidProxy from './covid.proxy';

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

  getCountryRegionsChartData: async (country: AvailableCountriesRegions) => {
    return getCountryRegionsChartData(country);
  },

  getCountryRegionsPivotData: async (country: "spain") => {
    return getCountryRegionsPivotData(country);
  }
};
