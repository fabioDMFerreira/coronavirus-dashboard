import fetch from 'isomorphic-unfetch';

import serializeCountriesData from './serializeCountriesData';
import serializeUsaData from './serializeUsaData';
import covidRepository, { CovidRepositoryId } from './covid.repository';

const validateDate = (date: Date) => Math.abs(new Date().getTime() - date.getTime()) / 36e5 < 1

const saveInCache = (name: CovidRepositoryId) => async (data: any) => {
  await covidRepository.set(name, data);

  return data;
}

const getFromCache = async (name: CovidRepositoryId) => {
  const covidData = await covidRepository.get(name)

  if (covidData && validateDate(covidData.createdAt)) {
    return covidData.data;
  }
}

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

    return Promise.all(
      [
        fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
          .then((res) => res.text()),
        fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
          .then((res) => res.text())
      ],
    ).then(serializeUsaData)
      .then(saveInCache("USA_REGIONS_DATA"))
  }
};
