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
  }
};
