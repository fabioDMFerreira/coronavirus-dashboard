import fetch from 'isomorphic-unfetch';

import covidRepository from './covid.repository';
import serializeCountriesData from './serializeCountriesData';
import { serializeUsaData, serializeUsaRegionData } from './serializeUsaData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveInCache = (name: string) => async (data: any) => {
  await covidRepository.set(name, data);

  return data;
}

const getFromCache = async (name: string) => {
  return covidRepository.get(name)
}

const fetchUsaDataFromCSSEGI = () => Promise.all(
  [
    fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
      .then((res) => res.text()),
    fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
      .then((res) => res.text())
  ],
)

export default {
  getCountriesData: async () => {

    const covidData = await getFromCache("COUNTRIES_DATA");

    if (covidData) {
      return covidData;
    }

    return Promise.all([
      fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv')
        .then((res) => res.text()),
      fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
        .then((res) => res.text())
    ])
      .then(serializeCountriesData)
      .then(saveInCache("COUNTRIES_DATA"))
  },

  getUsaData: async () => {

    const covidData = await getFromCache("USA_REGIONS_DATA");

    if (covidData) {
      return covidData;
    }

    return fetchUsaDataFromCSSEGI()
      .then(serializeUsaData)
      .then(saveInCache("USA_REGIONS_DATA"))
  },

  getUsaRegionData: async (region: string) => {

    const covidData = await getFromCache(region.toUpperCase() + "_REGION_DATA");

    if (covidData) {
      return covidData;
    }

    return fetchUsaDataFromCSSEGI()
      .then(serializeUsaRegionData(region))
      .then(saveInCache(region.toUpperCase() + "REGION_DATA"))
  }
};
